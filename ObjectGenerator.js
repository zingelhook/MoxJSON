var randomData = require('./RandomData.js');



exports.ObjectGenerator = (function() {
    var that = this;

    function ObjectGenerator(mock) {
        this.Mock = mock;
    }
    ObjectGenerator.prototype.GenerateMock = function() {
        var that = this;
        var numberOfFields = this.Mock.Fields.length;
        var obj = new Object();
        for (var i = 0; i < numberOfFields; i++) {

            var id = i;
            if (this.Mock.Fields[i].Name == 'id') {
                data = id;
                obj[this.Mock.Fields[i].Name] = data;
            } else {
                var data = that.GenerateSingleData(this.Mock.Fields[i].PredifinedData, this.Mock.Fields[i]);
                obj[this.Mock.Fields[i].Name] = data;
            }
        }
      
        return obj;

    }
    ObjectGenerator.prototype.GenerateSingleData = function(predefinedSampleData, field) {
        var data = '';
        var that=this;
        //console.log(predefinedSampleData);
        if (predefinedSampleData) {
            data = that.GetPredefinedSampleData(predefinedSampleData, field);
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
    ObjectGenerator.prototype.GetPredefinedSampleData = function(name, field) {
        var data = '';
        var that = this;
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
                    data = that.GetRandonNumber(num);

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

    ObjectGenerator.prototype.GetRandonNumber = function(num) {
        var num;
        var str = '';
        for (i = 0; i <= num; i++) {
            num = Math.floor(Math.random() * 9);
        }
        return num;
    }


    return ObjectGenerator;
})();