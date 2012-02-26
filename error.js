
var config = require('./config.js');

var client = new require("mysql").createClient({host:'localhost',port:config.MYSQLport,user: config.MYSQLusername,password:config.MYSQLpassword,database: config.MYSQLdbname});





exports.logError = function(request, loggederror, serviceCode) {
    //check the connection. If connected move on, else make the connection.nn
    if (client.connected === false) {

        client.connect(function(error, results) {
            if (error) {
                console.log('Connection Error: ' + error.message);
                return;
            }
            ClientConnectionReady(client);

        });
    }
    else
    {
        ClientConnectionReady(client);
    }





    function ClientConnectionReady(client)
    {
        client.query('USE mockJSON',
        function(error, results) {
            if (error) {
                console.log('ClientConnectionReady Error: ' + error.message);
                client.end();
                return;
            }
            ClientReady(client);
        });
    };

    function ClientReady(client)
    {


        var userAgent = request.headers['user-agent'];
        var svcId;

        if (serviceCode)
        {
            svcId = serviceCode;
        }
        else {
            svcId = 0;
        }
        var verboseError = 'user agent:' + userAgent + '\n' + 'Service Code:' + svcId + '\n' + 'msg:' + loggederror;
        var values = [verboseError];
        client.query('INSERT INTO Error_Log SET error = ?', values,
        function(error, results) {
            if (error) {
                console.log("ClientReady Error: " + error.message);
                client.end();
                return;
            }
            console.log('Inserted: ' + results.affectedRows + ' row.');
            console.log('Id inserted: ' + results.insertId);
        }
        );

    }
}


