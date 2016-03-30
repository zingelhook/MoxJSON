var fs = require("fs");
var file = "moxJSON.db";
var exists = fs.existsSync(file);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);



 	exports.GenerateTables = function () {
		db.serialize(function() {
  			if(!exists) {
				  
				//roles
    			db.run("CREATE TABLE Role (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT, notes TEXT)");
				
				//Service_DataTemplate_Fields
				db.run("CREATE TABLE Service_DataTemplate_Fields (id INTEGER PRIMARY KEY AUTOINCREMENT,dataTemplateId INTEGER, fieldId INTEGER)");
				
				//Service_DataTemplates
				db.run("CREATE TABLE Service_DataTemplates (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, langVar TEXT, min INTEGER, max INTEGER, userId INTEGER, idCode TEXT )");
				
				//Service_DataTemplates_SubTemplates
    			db.run("CREATE TABLE Service_DataTemplates_SubTemplates (id INTEGER PRIMARY KEY AUTOINCREMENT,dataTemplateId INTEGER, childTemplateId INTEGER, objectName TEXT)");
  			
			 	//Service_FieldType
			  	db.run("CREATE TABLE Service_FieldType (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT)");
				  
				//Service_Fields
    			db.run("CREATE TABLE Service_Fields (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT, typeId INTEGER, options TEXT, predefinedSampleDataId INTEGER, sampleData TEXT  )");
				
				//Service_PredefinedSampleData
				db.run("CREATE TABLE Service_PredefinedSampleData (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT)");
				
				//Tier
				db.run("CREATE TABLE Tier (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT)");
				
				//User_Meta
				db.run("CREATE TABLE User_Meta (id INTEGER PRIMARY KEY AUTOINCREMENT,type INTEGER, value TEXT)");
				
				//User_Meta_Type
				db.run("CREATE TABLE User_Meta_Type (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT)");
				
				//Users
				db.run("CREATE TABLE Users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, middleInital TEXT, lastName TEXT, userName TEXT, passWord TEXT, tier INTEGER, title TEXT, email TEXT)");

				//Users_Roles
				db.run("CREATE TABLE Users_Roles (id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER, roleId INTEGER)");
				
				
				//Populate start data
				db.run("INSERT INTO `Service_FieldType` VALUES (1,'string'),(2,'number'),(3,'date')");
				db.run("INSERT INTO `Service_PredefinedSampleData` VALUES (2,'FirstName'),(3,'LastName'),(4,'Full Name'),(5,'USPostal'),(6,'City'),(7,'State'),(8,'Country'),(9,'AddressOne'),(10,'Letter'),(11,'Lorum'),(12,'UserName'),(13,'Number'),(14,'Custom'),(15,'PlayingCard'),(1,'Date')");
		
			  }
		});
	}
