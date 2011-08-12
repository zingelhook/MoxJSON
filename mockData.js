var Client = require('mysql').Client;
var client = new Client();
client.user = 'root';
client.password = 'hellcat';
var dataTemplateId;
var dataRows = new Array();
var svcLog = require('./serviceLog.js');
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
            data = getSampleDate(field.Options);
            break;
        case 'FirstName':
            data = getFirstName();
            break;
        case 'LastName':
            data = getRandomLastName();
            break;
        case 'FullName':
            data = getFirstName() + getRandomLastName();
            break;
        case 'USPostal':
            data = getRandomUSPostal();
            break;
        case 'City':
            data = getRandomCity();
            break;
        case 'State':
            data = getRandomState();
            break;
        case 'Country':
            data = getRandonCountry();
            break;
        case 'AddressOne':
            data = buildAddress();
            break;
        case 'Letter':
            var randomnumber = Math.floor(Math.random() * 26);
			data = alphabet[randomnumber];
            break;
        case 'Lorum':
            data = getRandonLorum();
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
            data = randomAlphabetLower() + getRandomLastName();
            break;
		case 'PlayingCard':
			data = dealRandomCard();
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
//put in database
//var predefinedSampleDataNAMES = [
//'Date', 'FirstName', 'Lastname', 'FullName', 'City', 'State', 'Street', 'FullAddress', 'Letter', 'Lorum', 'AddressOne', 'UserName'
//];

var serviceType = 0;
var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
var MALE_FIRST_NAME = [];
MALE_FIRST_NAME.push('James');
MALE_FIRST_NAME.push('Kevin');
MALE_FIRST_NAME.push('Chris');
MALE_FIRST_NAME.push('Brian');
MALE_FIRST_NAME.push("Wyatt");
MALE_FIRST_NAME.push('Harold');
MALE_FIRST_NAME.push('Robert');
MALE_FIRST_NAME.push('LeGrande');
MALE_FIRST_NAME.push('Larry');
MALE_FIRST_NAME.push('Scott');
MALE_FIRST_NAME.push('Parker');
MALE_FIRST_NAME.push('Kyle');
MALE_FIRST_NAME.push('Christopher');
MALE_FIRST_NAME.push('Kenneth');
MALE_FIRST_NAME.push('Timothy');
MALE_FIRST_NAME.push('Jose');
MALE_FIRST_NAME.push('Edward');
MALE_FIRST_NAME.push('Eric');
MALE_FIRST_NAME.push('Edward');
MALE_FIRST_NAME.push('Axexander');
MALE_FIRST_NAME.push('Ed');
MALE_FIRST_NAME.push('David');
MALE_FIRST_NAME.push('Michael');
MALE_FIRST_NAME.push('Gordon');
MALE_FIRST_NAME.push('Andy');
MALE_FIRST_NAME.push('Bill');
MALE_FIRST_NAME.push('Louis');
MALE_FIRST_NAME.push('Agilbert');


var FEMALE_LASTNAME = [];
FEMALE_LASTNAME.push('Andrea');
FEMALE_LASTNAME.push('Miranda');
FEMALE_LASTNAME.push('Kay');
FEMALE_LASTNAME.push('Aundrea');
FEMALE_LASTNAME.push('Shelia');
FEMALE_LASTNAME.push('Hallie');
FEMALE_LASTNAME.push('Jacie');
FEMALE_LASTNAME.push('Mary');
FEMALE_LASTNAME.push('Dorothy');
FEMALE_LASTNAME.push('Jennifer');
FEMALE_LASTNAME.push('Ashley');
FEMALE_LASTNAME.push('Kay');
FEMALE_LASTNAME.push('Melissa');
FEMALE_LASTNAME.push('Christie');
FEMALE_LASTNAME.push('Amy');
FEMALE_LASTNAME.push('Michelle');
FEMALE_LASTNAME.push('Diane');
FEMALE_LASTNAME.push('Anna');
FEMALE_LASTNAME.push('Antoinette');
FEMALE_LASTNAME.push('Morwenna');
FEMALE_LASTNAME.push('Jessabella');
FEMALE_LASTNAME.push('Alessandra');




var LAST_NAME = [];
LAST_NAME.push('Smith');
LAST_NAME.push('Rodriguez');
LAST_NAME.push('Wilson');
LAST_NAME.push('Thompson');
LAST_NAME.push('Xie');
LAST_NAME.push('Lee');
LAST_NAME.push('Anderson');
LAST_NAME.push('Miller');
LAST_NAME.push('Hall');
LAST_NAME.push('Gaddy');
LAST_NAME.push('Walker');
LAST_NAME.push('Combahee');
LAST_NAME.push('Savala');
LAST_NAME.push('Unland');
LAST_NAME.push('Atkinson');
LAST_NAME.push('Alexopoulos');
LAST_NAME.push('Constantinides');
LAST_NAME.push('Schneider');
LAST_NAME.push('Miller');
LAST_NAME.push('Fischer');
LAST_NAME.push('Hoffmann');

var STREET = [];

STREET.push('Rotherhithe Street');
STREET.push(' Abbey Orchard St');
STREET.push(' Old Compton Street');
STREET.push('Three Colt St');
STREET.push('Charing Cross Road');
STREET.push('Liverpool Road');
STREET.push('Battersea Rise');
STREET.push('Great Sutton Street');
STREET.push('Park Ave');
STREET.push('Beacon point Lane');
STREET.push('Langridge Drive');
STREET.push('Woodbridge');
STREET.push('Waterside');
STREET.push('Pierside');
STREET.push('Dorchester Road');
STREET.push('Eculid');
STREET.push('Virgina Ave');
STREET.push('Virgina Highlands');
STREET.push('14 Street');
STREET.push('OakLeaf');

var STATES = [
' Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska, Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Marianas Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Virgin Islands', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];
var CITIES = ['Wildwood', '', 'Charleston', 'Clayton', 'Pineville', 'Mayberry', 'Melburne', 'Oakville', 'Winterville', 'Shady Groove', 'Cloverfield', 'Lilly', 'Lake Big Bear', 'Whistling Pines'];
var ALPABET_LOWER = ['a', 'b', 'c', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var  COUNTRIES =["Afghanistan","Åland Islands","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua And Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia And Herzegovina","Botswana","Bouvet Island","Brazil","British Indian Ocean Territory","Brunei Darussalam","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central African Republic","Chad","Chile","China","Christmas Island","Cocos (Keeling) Islands","Colombia","Comoros","Congo","Congo, The Democratic Republic Of The","Cook Islands","Costa Rica","Cote D'ivoire","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands (Malvinas)","Faroe Islands","Fiji","Finland","France","French Guiana","French Polynesia","French Southern Territories","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guinea-bissau","Guyana","Haiti","Heard Island And Mcdonald Islands","Holy See (Vatican City State)","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran, Islamic Republic Of","Iraq","Ireland","Isle Of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Korea, Democratic People's Republic Of","Korea, Republic Of","Kuwait","Kyrgyzstan","Lao People's Democratic Republic","Latvia","Lebanon","Lesotho","Liberia","Libyan Arab Jamahiriya","Liechtenstein","Lithuania","Luxembourg","Macao","Macedonia, The Former Yugoslav Republic Of","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia, Federated States Of","Moldova, Republic Of","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Niue","Norfolk Island","Northern Mariana Islands","Norway","Oman","Pakistan","Palau","Palestinian Territory, Occupied","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Pitcairn","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russian Federation","Rwanda","Saint Helena","Saint Kitts And Nevis","Saint Lucia","Saint Pierre And Miquelon","Saint Vincent And The Grenadines","Samoa","San Marino","Sao Tome And Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia And The South Sandwich Islands","Spain","Sri Lanka","Sudan","Suriname","Svalbard And Jan Mayen","Swaziland","Sweden","Switzerland","Syrian Arab Republic","Taiwan, Province Of China","Tajikistan","Tanzania, United Republic Of","Thailand","Timor-leste","Togo","Tokelau","Tonga","Trinidad And Tobago","Tunisia","Turkey","Turkmenistan","Turks And Caicos Islands","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay","Uzbekistan","Vanuatu","Venezuela","Viet Nam","Virgin Islands, British","Virgin Islands, U.S.","Wallis And Futuna","Western Sahara","Yemen","Zambia","Zimbabwe"];
function buildAddress() {
    var rndStyle = Math.floor(Math.random() * 2);
    var rndHouse = Math.floor(Math.random() * 2000);
    var rndstreet = Math.floor(Math.random() * STREET.length);
    var address;
    switch (rndStyle) {
    case 1:
        address = rndHouse + ' ' + STREET[rndstreet];
        break;
    case 2:
        address = rndHouse + ' ' + STREET[rndstreet];
        break;
    default:
        address = rndHouse + ' ' + STREET[rndstreet];
        break;

    }
    return address;
}

function buildRandomZip() {
    return '12943';
}

function getSingleData(predefinedSampleData, field) {
    //http://www.giantflyingsaucer.com/blog/?p=2596
    var data = '';
    if (predefinedSampleData) {
        data = getPredefinedSampleData(predefinedSampleData,field);
        if (!data) {
            //must be custom
            data = "Could Not Generate?";
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

                randomXToY(min, max);

                var myTemplate = new dataTemplate(myFields, 'KevinTest', 'en-us');
                var numberOfDataRows = randomXToY(min, max);
                //Math.floor(Math.random() * 500);
                //generate the rows.
                for (var ii = 0; ii < numberOfDataRows; ii++) {

                    dataRows.push(generateRow(myFields, 'user'));
                }



                //maybe we can write repose here
                if (dataRows) {
                    SVCresponse.writeHead(200, {
                        'Content-Type': 'application/x-javascript; charset=utf-8'
                    });
                    //var count = dataRows.length;
                    svcLog.logService(request, 'user', svcId, numberOfDataRows);
                    // errorHandler.logError(request,'This is a test error--------',callback);
                    var str = JSON.stringify(dataRows);

                    SVCresponse.write('moxsvc' + '(' + str + ')');

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

exports.getData = function(id, response, userrequest) {

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

//function to get random number upto m
function randomXToY(minVal, maxVal, floatVal) {
    var randVal = minVal + (Math.random() * (maxVal - minVal));
    return typeof floatVal == 'undefined' ? Math.round(randVal) : randVal.toFixed(floatVal);
}


function randomAlphabetLower() {
    var randVal = Math.floor(Math.random() * ALPABET_LOWER.length);
    return ALPABET_LOWER[randVal];
}

function getRandonCountry(){
    
    var randVal = Math.floor(Math.random() * COUNTRIES.length);
    return COUNTRIES[randVal];
}

//return random first name.
function getFirstName() {
    var maleOrFemale = Math.floor(Math.random() * 100);

    var firstName = '';
    if (maleOrFemale > 49) {
	    var fistRnd = Math.floor(Math.random() * MALE_FIRST_NAME.length);
        firstName = MALE_FIRST_NAME[fistRnd];
    }
    else {
	    var fistRnd = Math.floor(Math.random() * FEMALE_LASTNAME.length);
        firstName = FEMALE_LASTNAME[fistRnd];
    }
    return firstName;
}

function getRandomLastName() {
    var lastRnd = Math.floor(Math.random() * LAST_NAME.length);
    return LAST_NAME[lastRnd];
}


function getRandomState() {
    var rndState = Math.floor(Math.random() * STATES.length);
    return STATES[rndState];
}
function getRandomCity() {
    var rndCity = Math.floor(Math.random() * CITIES.length);
    return CITIES[rndCity];
}

function getRandonNumber(num) {
	var str = '';
	for (i=0;i<=num;i++)
	{
		str = str + '' + Math.floor(Math.random() * 9) + '';
	
	}

    return str;
}

function getRandonLorum() {
    var words = 'lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ');
    var index = Math.floor(Math.random() * words.length);
    return words[index];

}
function getRandomUSPostal() {
    return '123445';
}
function getSampleDate(options){
    randomNumber = Math.floor(Math.random() * 100);

    var date = new Date();
    date.setDate(date.getDate() - randomNumber)
    if(options){
        var opt = JSON.parse(options);
        if(opt.format)
        {
            return date.format(opt.format);
        }
        else
        {
            return date.format("m/dd/yy");
        }
    }
    else{
        return date.format("m/dd/yy");
    }
}
function dealRandomCard(){
	var suit = new Array(4)
	 suit[0] = 'spade';
	 suit[1] = 'heart';
	 suit[2] = 'club';
	 suit[3] = 'diamond';
	
	var deck = new Array(13)
	 deck[0] = "Ace";
	 deck[1] = "2";
	 deck[2] = "3";
	 deck[3] = "4";
	 deck[4] = "5";
	 deck[5] = "6";
	 deck[6] = "7";
	 deck[7] = "8";
	 deck[8] = "9";
	 deck[9] = "10";
	 deck[10] = "Jack";
	 deck[11] = "Queen";
	 deck[12] = "King";
	
	randomNumber = Math.floor(Math.random() * 13);
	randomSuit = Math.floor(Math.random() * 4);
	
	return suit[randomSuit] + '-' + deck[randomNumber];
	
	
}
//returns a rondom user.
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
    this.AddressOne = buildAddress();
    this.State = STATES[rndState];
    this.City = CITIES[rndCity];
    this.PostalCode = buildRandomZip();

};


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
