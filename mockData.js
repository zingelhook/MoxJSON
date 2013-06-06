var config = require('./config.js');
var dataTemplateId, output;
//var dataRows = new Array();
var svcLog = require('./serviceLog.js');
var randomData = require('./RandomData.js');
var objectGenerator = require('./ObjectGenerator.js');
var request;
var SVCresponse;

exports.getData = function(id, response, userrequest, outputType) {
    output = outputType;
    request = userrequest;
    SVCresponse = response;
    dataTemplateId = id;
    //check the connection. If connected move on, else make the connection.
    ClientConnectionReady(client);
};

var client = new require("mysql").createClient({
    host: 'localhost',
    port: config.MYSQLport,
    user: config.MYSQLusername,
    password: config.MYSQLpassword,
    database: config.MYSQLdbname
});

function ClientConnectionReady(client) {
    client.query('USE mockJSON',

    function(error, results) {
        if (error) {
            console.log('ClientConnectionReady Error: ' + error.message);
            client.end();
            return;
        }
        //getDataTemplate(client);
        var callback = function(obj) {
            // console.log(obj);
        }
        var dt = new DataTemplate();
        dt.Load(dataTemplateId, callback);

    });
};

var MockField = (function() {
    function MockField(name, typeName, predifinedData, options, sampleData) {
        this.Name = name;
        this.TypeName = typeName;
        this.PredifinedData = predifinedData;
        this.Options = options;
        this.SampleData = sampleData;
        this._generateData();
    }
    MockField.prototype._generateData = function() {
        var field = this;
        var name = field.PredifinedData;
        console.log(name);
        var data = '';
        if (name) {
            switch (name) {
                case 'Date':
                    data = randomData.getSampleDate(field.Options);
                    break;
                case 'FirstName':
                    data = randomData.getFirstName();
                    break;
                case 'LastName':
                    data = randomData.getRandomLastName();
                    break;
                case 'Full Name':
                    data = randomData.getFirstName() + ' ' + randomData.getRandomLastName();
                    break;
                case 'USPostal':
                    data = randomData.buildRandomZip();
                    break;
                case 'City':
                    data = randomData.getRandomCity();
                    break;
                case 'State':
                    data = randomData.getRandomState();
                    break;
                case 'Country':
                    data = randomData.getRandonCountry();
                    break;
                case 'AddressOne':
                    data = randomData.buildAddress();
                    break;
                case 'Letter':
                    var randomnumber = Math.floor(Math.random() * 26);
                    data = alphabet[randomnumber];
                    break;
                case 'Lorum':
                    data = randomData.getRandonLorum();
                    break;
                case 'Number':
                    var num = 1;
                    if (field.Options) {
                        var opt = JSON.parse(field.Options);
                        if (opt.length) {
                            num = parseInt(opt.length, 10);
                        }
                    }
                    data = randomData.getRandonNumber(num);

                    break;
                case 'UserName':
                    data = randomData.randomAlphabetLower() + randomData.getRandomLastName();
                    break;
                case 'PlayingCard':
                    data = randomData.dealRandomCard();
                    break;
                case 'Custom':
                    if (field.sampleData) {
                        var mySplitResult = field.sampleData.split(",");
                        var index = Math.floor(Math.random() * mySplitResult.length);
                        data = mySplitResult[index];
                    } else {
                        data = 'No Sample Data';
                    }
                    break;
                default:
                    return null;

            }

        }
        if (field.Options) {
            var opt = JSON.parse(field.Options);
            if (opt.length) {
                var len = parseInt(opt.length, 10);
                if (data.length > len) {
                    data = data.substring(0, len);
                }
            }
            if (opt.prepend) {
                data = opt.prepend + data;
            }
            if (opt.append) {
                data = data + opt.append;
            }

        }
        //console.log(data)
        //return data;
         this.Value=data;

    }
    return MockField;
})();


var SubMock = (function() {
    function SubMock(id, dataTemplateId, childTemplateId, objectName) {
        this.Id = id;
        this.DataTemplateId = dataTemplateId;
        this.ChildTemplateId = childTemplateId;
        this.ObjectName = objectName;
        this.LoadMock(id);
    }
    SubMock.prototype.LoadMock = function(id) {
        //console.log(id);
        var dt = new DataTemplate(id);
        dt.Load(id, function() {
            // console.log('-------')
        })
        this.DT = dt;
    }

    return SubMock;
})();

var stubMock = (function() {
    function stubMock(mock) {
        var count = mock.Fields.length;
        for (var i = 0; i < count; i++) {
            this[mock.Fields[i].Name] = mock.Fields[i].Value;
        }

        count = mock.SubMocks.length;
        for (var i = 0; i < count; i++) {
            //loop and build object
            var dt = new DataTemplate(mock.SubMocks[i]);
            dt.Load();

            this[mock.SubMocks[i].ObjectName] = dt;
        }
    }
    return stubMock;
})();


var DataTemplate = (function() {
    function DataTemplate(id) {
        this.Id = id;
    }
    DataTemplate.prototype.GenerateJSONStubObject = function(id, callback) {
        var dataTemplate = this;
        //generate a json representation of the mock including submocks
        //generate each submock and load into an array
        var mainMock = new stubMock(dataTemplate);

        SVCresponse.writeHead(200, {
            'Content-Type': 'application/json'
        });
        //svcLog.logService(request, 'user', id, numberOfDataRows);

        var str = JSON.stringify(mainMock);
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
    },
    DataTemplate.prototype.GenerateObject = function(id, callback) {
        var objGen = new objectGenerator.ObjectGenerator(this);
        var MockedObj = objGen.GenerateMock();


        var count = this.SubMocks.length;
        for (var i = 0; i < count; i++) {
            var m = new DataTemplate(this.SubMocks[i].ChildTemplateId);
            var callback = function(m) {
                //console.log(m);
            }
            m.Load(this.SubMocks[i].ChildTemplateId, callback);
            //obj[this.Mock.Fields[i].Name] = data;

        }
    },
    DataTemplate.prototype.Load = function(id, callback) {
        var dataTemplate = this;
        var values = [id];
        client.query('Select * from Service_DataTemplates where idCode=?', values, function(error, templateresults) {
            if (error) {
                console.log("ClientReady Error: " + error.message);
                client.end();
                return;
            }
            if (templateresults.length > 0) {
                dataTemplate.Name = templateresults[0].name;
                dataTemplate.Id = id;
                dataTemplate.LanguageVar = templateresults[0].langVar;
                dataTemplate.Min = templateresults[0].min;
                dataTemplate.Max = templateresults[0].max;
                dataTemplate.LoadFields(id, callback);
                dataTemplate.LoadSubMocks(id, null);
            }
        });
    };
    DataTemplate.prototype.LoadFields = function(id, callback) {
        var dataTemplate = this; //do something about this name
        var values = [id];
        client.query('Select sf.id, sf.name, ft.name as typeName,sf.typeId as typeId, sf.options, pd.name as predifinedData, sf.sampleData as sampleData from Service_DataTemplate_Fields rf join Service_Fields sf on rf.fieldId = sf.id join  Service_PredefinedSampleData pd on sf.predefinedSampleDataId = pd.id    join Service_FieldType ft on ft.id = sf.typeId  where dataTemplateId=?', values,

        function(error, results) {

            if (error) {
                console.log("ClientReady Error: " + error.message);
                client.end();
                return;
            }
            dataTemplate.Fields = [];
            var numberOfFields = results.length;

            //get the fields.
            for (var i = 0; i < numberOfFields; i++) {

                var field = new MockField(results[i].name, results[i].typeName, results[i].predifinedData, results[i].options, results[i].sampleData);
                //console.log(field);
                dataTemplate.Fields.push(field);

            }

            callback(dataTemplate);
        });
    };
    DataTemplate.prototype.LoadSubMocks = function(id, callback) {
        var values = [id];
        var dataTemplate = this;
        client.query('Select id,dataTemplateId ,childTemplateId,objectName from Service_DataTemplates_SubTemplates where dataTemplateId=?', values,


        function(error, results) {
            if (error) {
                console.log("ClientReady Error: " + error.message);
                client.end();
                return;
            }
            dataTemplate.SubMocks = [];

            var count = results.length;
            for (var i = 0; i < count; i++) {
                var sm = new SubMock(results[i].id, results[i].dataTemplateId, results[i].childTemplateId, results[i].objectName);
                dataTemplate.SubMocks.push(sm);

            }
            if (callback) {
                // callback(dataTemplate);
            }
            //generate
            dataTemplate.GenerateObject(this);
            dataTemplate.GenerateJSONStubObject(this);

        });
    };
    return DataTemplate;
})();

/*
var dataTemplate = function(fields, name, lang) {
    this.LanguageVariation = lang;
    this.Fields = fields;
    this.Name = name;
};
*/

/*
var Field = function(name, type, predefinedSampleData, options, sampleData) {
    this.Name = name;
    this.Type = type;
    this.Options = options;
    this.PredefinedSampleData = predefinedSampleData;
    this.sampleData = sampleData;

};
*/
/*
function getPredefinedSampleData(name, field) {
    var data = '';
    if (name) {
        switch (name) {
            case 'Date':
                data = randomData.getSampleDate(field.Options);
                break;
            case 'FirstName':
                data = randomData.getFirstName();
                break;
            case 'LastName':
                data = randomData.getRandomLastName();
                break;
            case 'Full Name':
                data = randomData.getFirstName() + ' ' + randomData.getRandomLastName();
                break;
            case 'USPostal':
                data = randomData.buildRandomZip();
                break;
            case 'City':
                data = randomData.getRandomCity();
                break;
            case 'State':
                data = randomData.getRandomState();
                break;
            case 'Country':
                data = randomData.getRandonCountry();
                break;
            case 'AddressOne':
                data = randomData.buildAddress();
                break;
            case 'Letter':
                var randomnumber = Math.floor(Math.random() * 26);
                data = alphabet[randomnumber];
                break;
            case 'Lorum':
                data = randomData.getRandonLorum();
                break;
            case 'Number':
                var num = 1;
                if (field.Options) {
                    var opt = JSON.parse(field.Options);
                    if (opt.length) {
                        num = parseInt(opt.length, 10);
                    }
                }
                data = getRandonNumber(num);

                break;
            case 'UserName':
                data = randomData.randomAlphabetLower() + randomData.getRandomLastName();
                break;
            case 'PlayingCard':
                data = randomData.dealRandomCard();
                break;
            case 'Custom':
                if (field.sampleData) {
                    var mySplitResult = field.sampleData.split(",");
                    var index = Math.floor(Math.random() * mySplitResult.length);
                    data = mySplitResult[index];
                } else {
                    data = 'No Sample Data';
                }
                break;
            default:
                return null;

        }

    }
    if (field.Options) {
        var opt = JSON.parse(field.Options);
        if (opt.length) {
            var len = parseInt(opt.length, 10);
            if (data.length > len) {
                data = data.substring(0, len);
            }
        }
        if (opt.prepend) {
            data = opt.prepend + data;
        }
        if (opt.append) {
            data = data + opt.append;
        }

    }
    return data;
}

var serviceType = 0;


function getSingleData(predefinedSampleData, field) {
    var data = '';
    if (predefinedSampleData) {
        data = getPredefinedSampleData(predefinedSampleData, field);
        if (!data && data !== 0) {
            //must be custom
            data = '';
        }

    } else {
        //custom
        data = '';
    }
    return data;
}


//go throgh 

function generateRow(fields, name, id) {

    var numberOfFields = fields.length;
    var obj = new Object();
    for (var i = 0; i < numberOfFields; i++) {

        if (fields[i].Name == 'id') {
            data = id;
            obj[fields[i].Name] = data;
        } else {
            var data = getSingleData(fields[i].PredefinedSampleData, fields[i]);
            obj[fields[i].Name] = data;
        }
    }

    return obj;
}


/*
function getDataTemplate(client) {


    var dataRows = new Array();
    var svcId = dataTemplateId;

    if (dataTemplateId) {
        svcId = dataTemplateId;
    } else {
        svcId = 0;
    }


    var values = [svcId];
    var myFields = new Array();


    client.query('Select * from Service_DataTemplates where idCode=?', values,

    function(error, templateresults) {
        if (error) {
            console.log("ClientReady Error: " + error.message);
            client.end();
            return;
        }
        if (templateresults.length > 0) {
            var min = templateresults[0].min;
            var max = templateresults[0].max;
            var id = templateresults[0].id;

            var values = [id];
            client.query('Select sf.id, sf.name, ft.name as typeName,sf.typeId as typeId, sf.options, pd.name as predifinedData, sf.sampleData as sampleData from Service_DataTemplate_Fields rf join Service_Fields sf on rf.fieldId = sf.id join  Service_PredefinedSampleData pd on sf.predefinedSampleDataId = pd.id	join Service_FieldType ft on ft.id = sf.typeId 	where dataTemplateId=?', values,

            function(error, results) {
                if (error) {
                    console.log("ClientReady Error: " + error.message);
                    client.end();
                    return;
                }

                var numberOfFields = results.length;

                //get the fields.
                for (var i = 0; i < numberOfFields; i++) {

                    var field = new Field(results[i].name, results[i].typeName, results[i].predifinedData, results[i].options, results[i].sampleData);
                    //console.log(field);
                    myFields.push(field);

                }

                //add id to every row
                var idField = new Field('id', 'string', '', 'Number', '');
                myFields.push(idField);

                var myTemplate = new dataTemplate(myFields, 'KevinTest', 'en-us');
                var numberOfDataRows = randomData.randomXToY(min, max);

                //generate the rows.
                for (var ii = 0; ii < numberOfDataRows; ii++) {

                    dataRows.push(generateRow(myFields, 'user', ii + 1));
                }

                //maybe we can write respose here
                if (dataRows) {
                    SVCresponse.writeHead(200, {
                        'Content-Type': 'application/json'
                    });

                    svcLog.logService(request, 'user', id, numberOfDataRows);

                    var str = JSON.stringify(dataRows);
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
                } else {
                    errorHandler.logError(request, 'Nothing returned from call.', callback);
                    console.log("Error:" + callback);
                }

            }


            );
        }
    });

}




function getRandonNumber(num) {
    var num;
    var str = '';
    for (i = 0; i <= num; i++) {
        num = Math.floor(Math.random() * 9);
    }
    return num;
}



var dateFormat = function() {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        timezoneClip = /[^-+\dA-Z]/g,
        pad = function(val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len) val = "0" + val;
            return val;
        };

    // Regexes and supporting functions are cached through closure
    return function(date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get",
            d = date[_ + "Date"](),
            D = date[_ + "Day"](),
            m = date[_ + "Month"](),
            y = date[_ + "FullYear"](),
            H = date[_ + "Hours"](),
            M = date[_ + "Minutes"](),
            s = date[_ + "Seconds"](),
            L = date[_ + "Milliseconds"](),
            o = utc ? 0 : date.getTimezoneOffset(),
            flags = {
                d: d,
                dd: pad(d),
                ddd: dF.i18n.dayNames[D],
                dddd: dF.i18n.dayNames[D + 7],
                m: m + 1,
                mm: pad(m + 1),
                mmm: dF.i18n.monthNames[m],
                mmmm: dF.i18n.monthNames[m + 12],
                yy: String(y).slice(2),
                yyyy: y,
                h: H % 12 || 12,
                hh: pad(H % 12 || 12),
                H: H,
                HH: pad(H),
                M: M,
                MM: pad(M),
                s: s,
                ss: pad(s),
                l: pad(L, 3),
                L: pad(L > 99 ? Math.round(L / 10) : L),
                t: H < 12 ? "a" : "p",
                tt: H < 12 ? "am" : "pm",
                T: H < 12 ? "A" : "P",
                TT: H < 12 ? "AM" : "PM",
                Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
            };

        return mask.replace(token, function($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}();

// Some common format strings
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    monthNames: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};

// For convenience...
Date.prototype.format = function(mask, utc) {
    return dateFormat(this, mask, utc);
};

*/