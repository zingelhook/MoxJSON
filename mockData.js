var Client = require('mysql').Client;
var client = new Client();
client.user = 'root';
client.password = 'hellcat';
var dataTemplateId,output;
var dataRows = new Array();
var svcLog = require('./serviceLog.js');
var randomData = require('./RandomData.js');
var request;
var SVCresponse;

var Field = function(name, type, predefinedSampleData, options, sampleData) {
    this.Name = name;
    this.Type = type;
    this.Options = options;
    this.PredefinedSampleData = predefinedSampleData;
    this.sampleData = sampleData;

};
var dataTemplate = function(fields, name, lang) {
    this.LanguageVariation = lang;
    this.Fields = fields;
    this.Name = name;
};

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
        case 'FullName':
            data = randomData.getFirstName() + randomData.getRandomLastName();
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
			if(field.Options){
				var opt = JSON.parse(field.Options);
				if(opt.length){
					num = parseInt(opt.length,10);
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
			if(field.sampleData){
            	var mySplitResult = field.sampleData.split(",");
            	var index = Math.floor(Math.random() * mySplitResult.length);
            	data= mySplitResult[index]; 
        	}
			else
			{
				data = 'No Sample Data';
	
			}
            break;
        default:
            return null;

        }


    }
	if(field.Options){
		var opt = JSON.parse(field.Options);
		if(opt.length){
			var len = parseInt(opt.length,10);
			if(data.length>len)
			{
				data=data.substring(0,len);	
			}
		}
		if(opt.prepend){
			data =  opt.prepend + data;
		}
		if(opt.append){
			data=data + opt.append;	
		}
	


	}
    return data;
}

var serviceType = 0;




function getSingleData(predefinedSampleData, field) {
    //http://www.giantflyingsaucer.com/blog/?p=2596
    var data = '';
    if (predefinedSampleData) {
        data = getPredefinedSampleData(predefinedSampleData,field);
    
        if (!data && data!==0) {
            //must be custom

            data = predefinedSampleData + '|' + field + "-Could Not Generate?";
        }
     
    }
    else {
        //custom
        data = '';
    }
    return data;
}


//go throgh 
function generateRow(fields, name) {

    var numberOfFields = fields.length;
    var obj = new Object();
    for (var i = 0; i < numberOfFields; i++) {
        var data = getSingleData(fields[i].PredefinedSampleData, fields[i]);
        obj[fields[i].Name] = data;
    }

    return obj;
}

function ClientConnectionReady(client) {
    client.query('USE mockJSON',
    function(error, results) {
        if (error) {
            console.log('ClientConnectionReady Error: ' + error.message);
            client.end();
            return;
        }

        getDataTemplate(client);

    });
}

function getDataTemplate(client) {


    var dataRows = new Array();
    var svcId = dataTemplateId;

    if (dataTemplateId) {
        svcId = dataTemplateId;
    }
    else {
        svcId = 0;
    }



    var values = [svcId];
    var myFields = new Array();


    client.query('Select * from Service_DataTemplates where id=?', values,
    function(error, templateresults) {
        if (error) {
            console.log("ClientReady Error: " + error.message);
            client.end();
            return;
        }
        if (templateresults.length > 0) {
            var min = templateresults[0].min;
            var max = templateresults[0].max;



            var values = [svcId];

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

                    myFields.push(field);

                }

               // randomData.randomXToY(min, max);

                var myTemplate = new dataTemplate(myFields, 'KevinTest', 'en-us');
                var numberOfDataRows = randomData.randomXToY(min, max);
                //Math.floor(Math.random() * 500);
                //generate the rows.
                for (var ii = 0; ii < numberOfDataRows; ii++) {

                    dataRows.push(generateRow(myFields, 'user'));
                }



                //maybe we can write respose here
                if (dataRows) {
                    SVCresponse.writeHead(200, {
                        //'Content-Type': 'application/x-javascript; charset=utf-8'
                        'Content-Type': 'application/json'
                        
                    });
                    //var count = dataRows.length;
                    svcLog.logService(request, 'user', svcId, numberOfDataRows);
                    // errorHandler.logError(request,'This is a test error--------',callback);
                    var str = JSON.stringify(dataRows);
                    if(output){
                        if(output==='json'){
                         SVCresponse.write(str);   
                        }
                        else{
                            SVCresponse.write('moxsvc' + '(' + str + ')');
                        }
                    }
                    else{
                        SVCresponse.write('moxsvc' + '(' + str + ')');
                    }
                   // SVCresponse.write('moxsvc' + '(' + str + ')');
                   // SVCresponse.write(str);
                    SVCresponse.end();
                }
                else {
                    errorHandler.logError(request, 'Nothing returned from call.', callback);
                    console.log("Error:" + callback);
                }

            }


            );
        }
    }
    );

}

exports.getData = function(id, response, userrequest,outputType) {
    output=outputType;
    request = userrequest;
    SVCresponse = response;
    dataTemplateId = id;
    //check the connection. If connected move on, else make the connection.
    if (client.connected === false) {

        client.connect(function(error, results) {
            if (error) {
                console.log('Connection Error: ' + error.message);
                return;
            }
            ClientConnectionReady(client);

        });
    }
    else {
        ClientConnectionReady(client);
    }

};



function getRandonNumber(num) {
    var num;
	var str = '';
	for (i=0;i<=num;i++)
	{
       num = Math.floor(Math.random() * 9);
		//str = str + '' + Math.floor(Math.random() * 9) + '';
	}
    return num;
}



//returns a rondom user.
/*
var user = function() {
    var randomnumber = Math.floor(Math.random() * 26);

    var fistRnd = Math.floor(Math.random() * MALE_FIRST_NAME.length);
    var lastRnd = Math.floor(Math.random() * LAST_NAME.length);
    var rndCity = Math.floor(Math.random() * CITIES.length);
    var rndState = Math.floor(Math.random() * STATES.length);
    var firstName;
    var maleOrFemale = Math.floor(Math.random() * 100);
    if (maleOrFemale > 49) {
        firstName = MALE_FIRST_NAME[fistRnd];
    }
    else {
        firstName = FEMALE_LASTNAME[fistRnd];
    }
    this.FirstName = firstName;
    this.userName = alphabet[randomnumber] + firstName;
    this.LastName = LAST_NAME[lastRnd];
    this.AddressOne = randomData.buildAddress();
    this.State = STATES[rndState];
    this.City = CITIES[rndCity];
    this.PostalCode = randomData.buildRandomZip();

};

*/
/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 http://blog.stevenlevithan.com/archives/date-time-format
 */

var dateFormat = function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
        timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        timezoneClip = /[^-+\dA-Z]/g,
        pad = function (val, len) {
            val = String(val);
            len = len || 2;
            while (val.length < len) val = "0" + val;
            return val;
        };

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
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
                d:    d,
                dd:   pad(d),
                ddd:  dF.i18n.dayNames[D],
                dddd: dF.i18n.dayNames[D + 7],
                m:    m + 1,
                mm:   pad(m + 1),
                mmm:  dF.i18n.monthNames[m],
                mmmm: dF.i18n.monthNames[m + 12],
                yy:   String(y).slice(2),
                yyyy: y,
                h:    H % 12 || 12,
                hh:   pad(H % 12 || 12),
                H:    H,
                HH:   pad(H),
                M:    M,
                MM:   pad(M),
                s:    s,
                ss:   pad(s),
                l:    pad(L, 3),
                L:    pad(L > 99 ? Math.round(L / 10) : L),
                t:    H < 12 ? "a"  : "p",
                tt:   H < 12 ? "am" : "pm",
                T:    H < 12 ? "A"  : "P",
                TT:   H < 12 ? "AM" : "PM",
                Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
            };

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}();

// Some common format strings
dateFormat.masks = {
    "default":      "ddd mmm dd yyyy HH:MM:ss",
    shortDate:      "m/d/yy",
    mediumDate:     "mmm d, yyyy",
    longDate:       "mmmm d, yyyy",
    fullDate:       "dddd, mmmm d, yyyy",
    shortTime:      "h:MM TT",
    mediumTime:     "h:MM:ss TT",
    longTime:       "h:MM:ss TT Z",
    isoDate:        "yyyy-mm-dd",
    isoTime:        "HH:MM:ss",
    isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
        "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};
