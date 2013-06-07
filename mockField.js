

var randomData = require('./RandomData.js');
exports.MockField = (function() {
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
        this.Value = data;
    }
    return MockField;
})();