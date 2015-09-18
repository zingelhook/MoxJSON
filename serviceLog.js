var config = require('./config.js');

var client = new require("mysql").createClient({
    host: 'localhost',
    port: config.MYSQLport,
    user: config.MYSQLusername,
    password: config.MYSQLpassword,
    database: config.MYSQLdbname
});


exports.logService = function (request, userName, serviceid, numberOfRows) {

    //check the connection. If connected move on, else make the connection.
    if (client.connected === false) {
        ClientConnectionReady(client);
    } else {
        ClientConnectionReady(client);
    }

    function ClientConnectionReady(client) {
        client.query('USE mockJSON',

            function (error, results) {
                if (error) {
                    console.log('ClientConnectionReady Error: ' + error.message);
                    client.end();
                    return;
                }
                ClientReady(client);
            });
    };

    function ClientReady(client) {
        var userAgent = request.headers['user-agent'];
        var svcId;

        if (serviceid) {
            svcId = serviceid;
        } else {
            svcId = 0;
        }
        var values = [userName, userAgent, svcId, numberOfRows];
        client.query('INSERT INTO Service_Log SET user = ? , userAgent = ? , serviceId =? , numberOfRows=?', values,

            function (error, results) {
                if (error) {
                    console.log("ClientReady Error: " + error.message);
                    client.end();
                    return;
                }

            });
    }
}