//
var Client = require('mysql').Client;
var client = new Client();
client.user = 'root';
client.password = 'hellcat';



exports.logService = function(request, userName, serviceid, numberOfRows) {

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

        if (serviceid)
        {
            svcId = serviceid;
        }
        else {
            svcId = 0;
        }
        var values = [userName, userAgent, svcId,numberOfRows];
        client.query('INSERT INTO Service_Log SET user = ? , userAgent = ? , serviceId =? , numberOfRows=?', values,
        function(error, results) {
            if (error) {
                console.log("ClientReady Error: " + error.message);
                client.end();
                return;
            }
            //console.log('Inserted: ' + results.affectedRows + ' row.');
            //console.log('Id inserted: ' + results.insertId);
        }
        );

    }
}


