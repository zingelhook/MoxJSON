
var config = require('./config.js');
var mockField = require('./mockField.js');
var mysql = require('./msqlClient.js');

function logger(msg) {
    //  console.log(msg);
}

var client = new require("mysql").createClient({
    host: 'localhost',
    port: config.MYSQLport,
    user: config.MYSQLusername,
    password: config.MYSQLpassword,
    database: config.MYSQLdbname
});

var SubMock = exports.(function () {
    function SubMock(id, dataTemplateId, childTemplateId, objectName) {
        //logger('init submock:' + id);
        this.Id = id;
        this.DataTemplateId = dataTemplateId;
        this.ChildTemplateId = childTemplateId;
        this.ObjectName = objectName;
        this.LoadMock(childTemplateId.DataTemplateId, null);
    }
    SubMock.prototype.LoadMock = function (id) {
        //  logger('submock loading..');
        var dt = new DataTemplate(id);
        dt.Load();
        this.DT = dt;
    }

    return SubMock;
})();

exports.DataTemplate = (function () {
    function DataTemplate(id, parentId, callback) {
        this.LoadedChildren = [];
        this.ParentId = parentId;
        this.Loaded = false;
        this.Id = id;
        this._currentOperations = 0;
        logger('Init DataTemplate:' + id);
    }
    DataTemplate.prototype.LogChildLoaded = function (submockId) {
        this.LoadedChildren.push[submockId];
    }

    DataTemplate.prototype.GenerateJSONStubObject = function () {
        logger('call GenerateJSONStubObject for:' + this.Id);
        var dataTemplate = this;
        this.MockObj = {};

        var count = dataTemplate.Fields.length;
        for (var i = 0; i < count; i++) {
            this.MockObj[dataTemplate.Fields[i].Name] = dataTemplate.Fields[i].Value;
        }

        count = dataTemplate.SubMocks.length;
        for (var i = 0; i < count; i++) {
            //console.log(dataTemplate.SubMocks[i].ObjectName);
            //loop and build object
            //var dt = new DataTemplate(dataTemplate.SubMocks[i].DataTemplateId);
            // dt.Load();
            var obj = dataTemplate.SubMocks[i].DT;
            //console.log(obj);
            this.MockObj[dataTemplate.SubMocks[i].ObjectName] = dataTemplate.SubMocks[i].DT.MockObj;
        }
        this._change();
        //console.log(this.Id);
    },

    DataTemplate.prototype.Load = function () {
        var dataTemplate = this;
        var id = dataTemplate.Id;
        logger('call Load:' + id);

        var values = [id];
        mysql.client.query('Select * from Service_DataTemplates where idCode=?', values, function (error, templateresults) {
            if (error) {
                logger("ClientReady Error: " + error.message);
                client.end();
                return;
            }

            if (templateresults.length > 0) {
                logger('Loading template from db:' + id);
                dataTemplate.Name = templateresults[0].name;
                dataTemplate.Id = id;
                dataTemplate.LanguageVar = templateresults[0].langVar;
                dataTemplate.Min = templateresults[0].min;
                dataTemplate.Max = templateresults[0].max;
                dataTemplate.LoadFields(id);
            }
        });
    };
    DataTemplate.prototype.LoadFields = function (id) {
        var dataTemplate = this;
        logger('call LoadFields');


        var values = [id];
        mysql.client.query('Select sf.id, sf.name, ft.name as typeName,sf.typeId as typeId, sf.options, pd.name as predifinedData, sf.sampleData as sampleData from Service_DataTemplate_Fields rf join Service_Fields sf on rf.fieldId = sf.id join  Service_PredefinedSampleData pd on sf.predefinedSampleDataId = pd.id    join Service_FieldType ft on ft.id = sf.typeId  where dataTemplateId=?', values,

            function (error, results) {

                if (error) {
                    logger("ClientReady Error: " + error.message);
                    client.end();
                    return;
                }
                
                dataTemplate.Fields = [];
                var numberOfFields = results.length;

                //get the fields.
                for (var i = 0; i < numberOfFields; i++) {
                    var field = new mockField.MockField(results[i].name, results[i].typeName, results[i].predifinedData, results[i].options, results[i].sampleData);
                    dataTemplate.Fields.push(field);
                }

                logger('found ' + numberOfFields + ' fields for ' + id)
                dataTemplate.LoadSubMocks(id);
            });

    };
    DataTemplate.prototype.LoadSubMocks = function (id) {
        var dataTemplate = this;

        logger('call LoadSubMocks for:' + id);
        var values = [id];
        var dataTemplate = this;
        mysql.client.query('Select id,dataTemplateId ,childTemplateId,objectName from Service_DataTemplates_SubTemplates where dataTemplateId=?', values,

            function (error, results) {
                if (error) {
                    logger("ClientReady Error: " + error.message);
                    client.end();
                    return;
                }
                dataTemplate.SubMocks = [];

                var count = results.length;
                if (count === 0) { //if no more mock - return the response

                } else { //keep loading mocks
                    for (var i = 0; i < count; i++) {
                        var sm = new SubMock(results[i].id, results[i].dataTemplateId, results[i].childTemplateId, results[i].objectName);
                        dataTemplate.SubMocks.push(sm);
                    }
                }
                
                //log the fact that this mock is loaded to its parent.
                var parent = loadedMocks.find(dataTemplateId.ParentId);
                if (parent) {
                    parent.push(dataTemplate.Id);

                } else {
                    var p = {};
                    p.id = dataTemplate.ParentId;
                    p.children = [];
                    p.children.push(id);
                    loadedMocks.push(p);
                }
                logger(loadedMocks);
            });
    };
    return DataTemplate;
})();


