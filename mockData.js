var config = require('./config.js');
var mysql = require('./msqlClient.js');
var log = require('./logger.js');
var mockField = require('./mockField.js');
var SVCresponse;
var mainMock;

var MockList = (function() {
    function MockList() {
        this.List = [];
        this.MocksLoaded = 0;
    }
    MockList.prototype.Add = function(id) {
        this.List.push(id);
        log.logger('Adding:' + id);
        this.MocksLoaded++;
    };
    MockList.prototype._done = function() {
        log.logger('total mocks loaded:' + this.MocksLoaded);
        var callback = function() {
            SVCresponse.writeHead(200, {
                'Content-Type': 'application/json'
            });

            //log this here 
            //svcLog.logService(request, 'user', id, numberOfDataRows);

            var str = JSON.stringify(mainMock.MockObj);
            if (output) {
                if (output === 'json') {
                    SVCresponse.write(str);
                } else {
                    SVCresponse.write('moxsvc' + '(' + str + ')');
                }
            } else {
                SVCresponse.write('moxsvc' + '(' + str + ')');
            }
            SVCresponse.end();
        }
        mainMock.MakeObj(callback);
    };
    MockList.prototype.Remove = function(id) {
        if (this.List.length > 0) {
            if (this.List.length === 1) {
                if (this.List[0] === id) {
                    this._done();
                } else {
                    log.logger('Trying to remove wrong item from list:' + id + ' is not what we have left:' + this.List[0]);
                }

            } else {
                var index = this.List.indexOf(id);
                this.List.splice(index, 1);
                log.logger('Removing:' + id);
                log.logger('List is at:' + this.List.length);
                if (this.List.length === 0) {
                    this._done();
                }
            }

        } else {
            log.logger('Trying to remove from an empty list item:' + id);
        }
    };
    return MockList;
})();

var mocklist = new MockList();

Array.prototype.indexOf = function(obj, fromIndex) {
    if (fromIndex == null) {
        fromIndex = 0;
    } else if (fromIndex < 0) {
        fromIndex = Math.max(0, this.length + fromIndex);
    }
    for (var i = fromIndex, j = this.length; i < j; i++) {
        if (this[i] === obj)
            return i;
    }
    return -1;
};

exports.getData = function(id, response, userrequest, outputType) {
    log.logger('start');

    output = outputType;
    request = userrequest;
    SVCresponse = response;
    //the callback when the database client is ready.
    var callback = function() {
        log.logger('Msql Connection Callback');
        mocklist.Add(id);
        mainMock = new Mock(id);
        mainMock.Load();
    }

    //check the connection. If connected move on, else make the connection.
    mysql.ClientConnectionReady(mysql.client, callback);
};


var Mock = (function() {
    function Mock(id) {
        this.Id = id;
        log.logger('----------------------------');
        log.logger('init mock with id:' + id);
    }
    Mock.prototype.MakeObj = function(callback) {
        var dataTemplate = this;
        dataTemplate.MockObj = {};
        log.logger('call GenerateJSONStubObject for:' + this.Id);

        var count = dataTemplate.Fields.length;
        for (var i = 0; i < count; i++) {
            this.MockObj[dataTemplate.Fields[i].Name] = dataTemplate.Fields[i].Value;
        }

        count = dataTemplate.SubMocks.length;
        for (var i = 0; i < count; i++) {
            log.logger(dataTemplate.SubMocks[i].Mock);
            dataTemplate.SubMocks[i].Mock.MakeObj();
            var obj = dataTemplate.SubMocks[i].Mock;
            //console.log(obj);
            dataTemplate.MockObj[dataTemplate.SubMocks[i].ObjectName] = dataTemplate.SubMocks[i].Mock.MockObj;
        }
         
        if (callback) { //the end = make response
            callback();
        }
    };
    Mock.prototype.Load = function() {

        var dataTemplate = this;
        log.logger('load mock with id:' + this.Id);

        //Loading mock meta
        var values = [this.Id];
        mysql.client.query('Select * from Service_DataTemplates where idCode=?', values, function(error, templateresults) {
            if (error) {
                log.logger("ClientReady Error: " + error.message);
                client.end();
                return;
            }

            if (templateresults.length > 0) {
                log.logger('Loading template from db:' + dataTemplate.Id);
                dataTemplate.Name = templateresults[0].name;
                dataTemplate.LanguageVar = templateresults[0].langVar;
                dataTemplate.Min = templateresults[0].min;
                dataTemplate.Max = templateresults[0].max;

                //now load the fields
                log.logger('call LoadFields');

                mysql.client.query('Select sf.id, sf.name, ft.name as typeName,sf.typeId as typeId, sf.options, pd.name as predifinedData, sf.sampleData as sampleData from Service_DataTemplate_Fields rf join Service_Fields sf on rf.fieldId = sf.id join  Service_PredefinedSampleData pd on sf.predefinedSampleDataId = pd.id    join Service_FieldType ft on ft.id = sf.typeId  where dataTemplateId=?', values,

                function(error, results) {

                    if (error) {
                        log.logger("ClientReady Error: " + error.message);
                        client.end();
                        return;
                    }
                    dataTemplate.Fields = [];
                    var numberOfFields = results.length;

                    //make representation of this mock with fields.
                    var mockObj = {};

                    //get the fields.
                    for (var i = 0; i < numberOfFields; i++) {
                        var field = new mockField.MockField(results[i].name, results[i].typeName, results[i].predifinedData, results[i].options, results[i].sampleData);
                        dataTemplate.Fields.push(field);
                        mockObj[results[i].name] = field.Value;
                    }

                    log.logger('found ' + numberOfFields + ' fields for ' + dataTemplate.Id);

                    // now load submocks
                    log.logger('call LoadSubMocks for:' + dataTemplate.Id);
                    mysql.client.query('Select id,dataTemplateId ,childTemplateId,objectName from Service_DataTemplates_SubTemplates where dataTemplateId=?', values,

                    function(error, results) {
                        if (error) {
                            log.logger("ClientReady Error: " + error.message);
                            client.end();
                            return;
                        }
                        dataTemplate.SubMocks = [];

                        var count = results.length;
                        if (count === 0) { //if no more mock - return the response
                            mocklist.Remove(dataTemplate.Id);
                        } else { //keep loading mocks
                            log.logger('found submocks for ' + dataTemplate.Id);
                            for (var i = 0; i < count; i++) {
                                mocklist.Add(results[i].childTemplateId);
                                var sm = new SubMock(results[i].id, results[i].dataTemplateId, results[i].childTemplateId, results[i].objectName);
                                dataTemplate.SubMocks.push(sm);
                                // sm.LoadMock(results[i].childTemplateId);
                                mockObj[results[i].objectName] = sm.Mock.MockObj;
                            }
                            mocklist.Remove(dataTemplate.Id);
                        }
                    });
                });
            }
        });
    };
    return Mock;

})();

var SubMock = (function() {
    function SubMock(id, dataTemplateId, childTemplateId, objectName) {
        log.logger('init submock:' + childTemplateId);
        this.Id = id;
        this.DataTemplateId = dataTemplateId;
        this.ChildTemplateId = childTemplateId;
        this.ObjectName = objectName;
        this.LoadMock(childTemplateId);
    }
    SubMock.prototype.LoadMock = function(id) {
        log.logger('submock loading for:' + id);
        var dt = new Mock(id);
        dt.Load();
        this.Mock = dt;
    }

    return SubMock;
})();

