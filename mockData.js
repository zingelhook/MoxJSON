var config = require('./config.js');
var mysql = require('./msqlClient.js');
var log = require('./logger.js');
var mockField = require('./mockField.js');
var randomData = require('./RandomData.js');
var SVCresponse;
var mainMock;
var objJSON = [];
//contains list of all mocks that must be loaded before we can generate JSON
var MockList = (function () {
    function MockList() {
        this.List = [];
        this.MocksLoaded = 0;
    }
    MockList.prototype.Add = function (id) {
        this.List.push(id);
        log.logger('Adding:' + id, 1);
        this.MocksLoaded++;
    };
    MockList.prototype._done = function () {
        log.logger('total mocks loaded:' + this.MocksLoaded, 2);

        //make sure this list is empty
        this.List = [];
        var callback = function () {

            SVCresponse.writeHead(200, {
                'Content-Type': 'application/json'
            });

            //log this here 
            //svcLog.logService(request, 'user', id, numberOfDataRows);

            var str = JSON.stringify(objJSON);
            //now clear out object
            objJSON = [];
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
        };
        mainMock.MakeObj(callback);
    };
    MockList.prototype.Remove = function (id) {
        if (this.List.length > 0) {
            if (this.List.length === 1) {
                if (this.List[0] === id) {
                    this._done();
                } else {
                    log.logger('Trying to remove wrong item from list:' + id + ' is not what we have left:' + this.List[0], 1);
                }

            } else {
                var index = this.List.indexOf(id);
                this.List.splice(index, 1);
                log.logger('Removing:' + id, 1);
                log.logger('List is at:' + this.List.length, 1);
                if (this.List.length === 0) {
                    this._done();
                } else {
                    log.logger(this.List, 1);
                }
            }

        } else {
            log.logger('Trying to remove from an empty list item:' + id, 1);
        }
    };
    return MockList;
})();

var mocklist = new MockList();

Array.prototype.indexOf = function (obj, fromIndex) {
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

exports.getData = function (idCode, response, userrequest, outputType) {
    log.logger('start', 1);
    output = outputType;
    request = userrequest;
    SVCresponse = response;
    //the callback when the database client is ready.
    var callback = function () {
        log.logger('Msql Connection Callback', 1);
        mainMock = new Mock(null, idCode, true);
        mainMock.Load();
    };

    //check the connection. If connected move on, else make the connection.
    mysql.ClientConnectionReady(mysql.client, callback);
};


var Mock = (function () {
    function Mock(id, idCode, isMain) {
        var dataTemplate = this;
        this.IdCode = idCode;
        this.IsMain = isMain;
        this.Id = id;
        log.logger('----------------------------', 1);
        if (dataTemplate.Id != null) {
            log.logger('init mock with id:' + dataTemplate.Id, 1);
        } else {
            if (!dataTemplate.IdCode) {
                log.logger(dataTemplate, 1);

            } else {
                log.logger('init mock with idCode:' + dataTemplate.IdCode, 1);
            }
        }
    }
    Mock.prototype.MakeObj = function (callback) {
        var dataTemplate = this;
        dataTemplate.SingleObject = false;
        dataTemplate.MockObj = {};
        log.logger('call MakeObj for:' + dataTemplate.Id, 1);
        var rowcount = dataTemplate.RowCount;
        var fcount = dataTemplate.Fields.length;
        var scount = dataTemplate.SubMocks.length;
        log.logger('Generating ' + rowcount + ' rows', 1);
        if (dataTemplate.Max === 1 && dataTemplate.Min === 1) {
            dataTemplate.SingleObject = true;
        } else {
            dataTemplate.MockObj = [];
        }

        for (var ii = 0; ii < rowcount; ii++) {
            var mockObj = {};
            var subMockObj = {};
            log.logger('^^^^^^^^^^^^^^^^^^^^^^^^^', 1);
            for (var iq = 0; iq < fcount; iq++) {
                var data = dataTemplate.Fields[iq].GenerateData();

                log.logger(data, 1);
                if (data === 'true') {
                    data = true;
                }
                if (data === 'false') {
                    data = false;
                }
                mockObj[dataTemplate.Fields[iq].Name] = data;
            }

            for (var iz = 0; iz < scount; iz++) {
                dataTemplate.SubMocks[iz].Mock.MakeObj();
                var obj = dataTemplate.SubMocks[iz].Mock;
                mockObj[dataTemplate.SubMocks[iz].ObjectName] = dataTemplate.SubMocks[iz].Mock.MockObj;
            }

            if (dataTemplate.IsMain === true) {
                objJSON.push(mockObj)
            } else {

                if (dataTemplate.SingleObject === true) {
                    dataTemplate.MockObj = mockObj;
                } else {
                    dataTemplate.MockObj.push(mockObj);
                }

                log.logger('^^^^^^^^^^^^^^^^^^^^^^^^^', 1);
            }
        }

        if (callback) { //the end = make response
            callback();
        }
    };
    Mock.prototype.Load = function () {
        var dataTemplate = this;
        var values, sql, usingId;
        if (dataTemplate.Id != null) {
            usingId = dataTemplate.Id;
            log.logger('load mock with id:' + dataTemplate.Id, 1);
            values = [this.Id];
            sql = 'Select * from Service_DataTemplates where id=?';
        } else {
            usingId = dataTemplate.IdCode;
            log.logger(dataTemplate, 1);
            log.logger('load mock with idCode:' + dataTemplate.IdCode, 1);
            values = [this.IdCode];
            sql = 'Select * from Service_DataTemplates where idCode=?';
        }

        mysql.client.query(sql, values, function (error, templateresults) {
            if (error) {
                log.logger("ClientReady Error: " + error.message, 1);
                client.end();
                return;
            }

            if (templateresults.length > 0) {
                log.logger('Loading template from db:' + usingId, 1);
                dataTemplate.Name = templateresults[0].name;
                dataTemplate.LanguageVar = templateresults[0].langVar;
                dataTemplate.Min = templateresults[0].min;
                dataTemplate.Max = templateresults[0].max;
                dataTemplate.Id = templateresults[0].id;
                dataTemplate.IdCode = templateresults[0].idCode;

                if (dataTemplate.Max == dataTemplate.Min) {
                    dataTemplate.RowCount = dataTemplate.Min;
                } else {
                    dataTemplate.RowCount = randomData.getRandomRange(dataTemplate.Min, dataTemplate.Max);
                }

                log.logger('row count:' + dataTemplate.RowCount, 1);
                values = [dataTemplate.Id];
                // console.log(values);
                //add the realid to the list.
                if (dataTemplate.IsMain === true) {
                    mocklist.Add(dataTemplate.Id);
                }

                //now load the fields
                log.logger('call LoadFields', 1);

                mysql.client.query('Select sf.id, sf.name, ft.name as typeName,sf.typeId as typeId, sf.options, pd.name as predifinedData, sf.sampleData as sampleData from Service_DataTemplate_Fields rf join Service_Fields sf on rf.fieldId = sf.id join  Service_PredefinedSampleData pd on sf.predefinedSampleDataId = pd.id join Service_FieldType ft on ft.id = sf.typeId where dataTemplateId=?', values,

                    function (error, results) {

                        if (error) {
                            log.logger("ClientReady Error: " + error.message, 1);
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

                        log.logger('found ' + numberOfFields + ' fields for ' + dataTemplate.Id, 1);

                        // now load submocks
                        log.logger('call LoadSubMocks for:' + dataTemplate.Id);
                        values = [dataTemplate.Id];
                        mysql.client.query('Select id,dataTemplateId ,childTemplateId,objectName from Service_DataTemplates_SubTemplates where dataTemplateId=?', values,

                            function (error, results) {
                                if (error) {
                                    log.logger("ClientReady Error: " + error.message, 1);
                                    client.end();
                                    return;
                                }
                                dataTemplate.SubMocks = [];

                                var count = results.length;
                                if (count === 0) { //if no more mock - return the response
                                    mocklist.Remove(dataTemplate.Id);
                                } else { //keep loading mocks
                                    log.logger('found submocks for ' + dataTemplate.Id, 1);
                                    for (var i = 0; i < count; i++) {
                                        mocklist.Add(results[i].childTemplateId);
                                        var sm = new SubMock(results[i].id, results[i].dataTemplateId, results[i].childTemplateId, results[i].objectName);
                                        dataTemplate.SubMocks.push(sm);

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

var SubMock = (function () {
    function SubMock(id, dataTemplateId, childTemplateId, objectName) {
        log.logger('init submock:' + childTemplateId);
        this.Id = id;
        this.DataTemplateId = dataTemplateId;
        this.ChildTemplateId = childTemplateId;
        this.ObjectName = objectName;
        this.LoadMock(childTemplateId);
    }
    SubMock.prototype.LoadMock = function (id) {
        log.logger('submock loading for:' + id);
        var dt = new Mock(id, null, false);
        dt.Load('byId');
        this.Mock = dt;
    };

    return SubMock;
})();