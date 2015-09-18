var moment = require('moment');

exports.buildRandomZip = function() {
    return '12943';
}
function RandomBit(){
    if(Math.floor(Math.random() * 100)>49){
        return true;
    }
    else{
        return false;
    }
}
//return random first name.
exports.getFirstName = function() {
    var fistRnd, firstName = '';

    if (RandomBit()) {
        fistRnd = Math.floor(Math.random() * MALE_FIRST_NAME.length);
        firstName = MALE_FIRST_NAME[fistRnd];
    } else {
        fistRnd = Math.floor(Math.random() * FEMALE_FIRSTNAME.length);
        firstName = FEMALE_FIRSTNAME[fistRnd];
    }

    return firstName;
}

exports.getRandomLastName = function() {
    var lastRnd = Math.floor(Math.random() * LAST_NAME.length);
    return LAST_NAME[lastRnd];
}

exports.getRandomState = function() {
    var rndState = Math.floor(Math.random() * STATES.length);
    return STATES[rndState];
}

exports.getRandomCity = function() {
    var rndCity = Math.floor(Math.random() * CITIES.length);
    return CITIES[rndCity];
}



exports.buildAddress = function() {
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

exports.getRandonLorum = function() {
    var words = 'lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ');
    var index = Math.floor(Math.random() * words.length);
    return words[index];

}


exports.getSampleDate = function(options) {
    randomNumber = Math.floor(Math.random() * 100);
    var date = new Date();
    date.setDate(date.getDate() - randomNumber)

    var mDate = moment(date);
    if (options) {
        var opt = JSON.parse(options);
        if (opt.format) {
            return mDate.format(opt.format);
        } else {
            return mDate.format("m/dd/yy");
        }
    } else {
        return mDate.format("m/dd/yy");
    }
}

//function to get random number upto m
exports.randomXToY = function(minVal, maxVal, floatVal) {
    var randVal = minVal + (Math.random() * (maxVal - minVal));
    return typeof floatVal == 'undefined' ? Math.round(randVal) : randVal.toFixed(floatVal);
}


exports.randomAlphabetLower = function() {
    var randVal = Math.floor(Math.random() * ALPABET_LOWER.length);
    return ALPABET_LOWER[randVal];
}

exports.getRandonCountry = function() {

    var randVal = Math.floor(Math.random() * COUNTRIES.length);
    return COUNTRIES[randVal];
}

exports.getRandonNumber = function(num) {
    var num;
    for (i = 0; i <= num; i++) {
        num = Math.floor(Math.random() * 9);
    }
    return num;
}

exports.getRandomRange = function(min, max) {
    return parseInt(Math.random() * (max - min) + min, 10);
}

exports.dealRandomCard = function() {
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


var FEMALE_FIRSTNAME = [];
FEMALE_FIRSTNAME.push('Andrea');
FEMALE_FIRSTNAME.push('Miranda');
FEMALE_FIRSTNAME.push('Kay');
FEMALE_FIRSTNAME.push('Aundrea');
FEMALE_FIRSTNAME.push('Shelia');
FEMALE_FIRSTNAME.push('Hallie');
FEMALE_FIRSTNAME.push('Jacie');
FEMALE_FIRSTNAME.push('Mary');
FEMALE_FIRSTNAME.push('Dorothy');
FEMALE_FIRSTNAME.push('Jennifer');
FEMALE_FIRSTNAME.push('Ashley');
FEMALE_FIRSTNAME.push('Kay');
FEMALE_FIRSTNAME.push('Melissa');
FEMALE_FIRSTNAME.push('Christie');
FEMALE_FIRSTNAME.push('Amy');
FEMALE_FIRSTNAME.push('Michelle');
FEMALE_FIRSTNAME.push('Diane');
FEMALE_FIRSTNAME.push('Anna');
FEMALE_FIRSTNAME.push('Antoinette');
FEMALE_FIRSTNAME.push('Morwenna');
FEMALE_FIRSTNAME.push('Jessabella');
FEMALE_FIRSTNAME.push('Alessandra');



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
LAST_NAME.push('Williams');
LAST_NAME.push('Walker');
LAST_NAME.push('Combahee');
LAST_NAME.push('Jackson');
LAST_NAME.push('Johnson');
LAST_NAME.push('Atkinson');
LAST_NAME.push('Alexopoulos');
LAST_NAME.push('Constantinides');
LAST_NAME.push('Schneider');
LAST_NAME.push('Miller');
LAST_NAME.push('Fischer');
LAST_NAME.push('Hoffmann');
LAST_NAME.push('Lee');
LAST_NAME.push('Hernandez');
LAST_NAME.push('Taylor');
LAST_NAME.push('Diaz');
LAST_NAME.push('Wagner');
LAST_NAME.push('Zimmermann');
LAST_NAME.push('Bielszowski');
LAST_NAME.push('Beckermann');
LAST_NAME.push('Alexopoulos');
LAST_NAME.push('Constantinides');
LAST_NAME.push('Panagopoulos');

var STREET = [];

STREET.push('Rotherhithe Street');
STREET.push('Abbey Orchard St');
STREET.push('Old Compton Street');
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

var COUNTRIES = ["Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua And Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia And Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, The Democratic Republic Of The", "Cook Islands", "Costa Rica", "Cote D'ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-bissau", "Guyana", "Haiti", "Heard Island And Mcdonald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic Of", "Iraq", "Ireland", "Isle Of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic Of", "Korea, Republic Of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, The Former Yugoslav Republic Of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States Of", "Moldova, Republic Of", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestinian Territory, Occupied", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Helena", "Saint Kitts And Nevis", "Saint Lucia", "Saint Pierre And Miquelon", "Saint Vincent And The Grenadines", "Samoa", "San Marino", "Sao Tome And Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia And The South Sandwich Islands", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard And Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province Of China", "Tajikistan", "Tanzania, United Republic Of", "Thailand", "Timor-leste", "Togo", "Tokelau", "Tonga", "Trinidad And Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks And Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.S.", "Wallis And Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"];
