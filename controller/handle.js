var sql = require("mssql");
var moment = require('moment')
// config for your database
var config = {
    user: 'sa',
    password: 'P@d0rU123',
    server: '167.71.200.91',
    database: 'sthangDB'
};

// connect to your database
var errdb = sql.connect(config)
if (errdb) {
    console.log(errdb);
}

class request {

    async func(req) {
        let functionName = '[createStudent]' //ชื่อ function

        return new Promise(async function (resolve, reject) {

            try {

                var request = new sql.Request();

                var command

                var result = await request.query(command); //ยิง command เข้าไปใน


                let message = {
                    statusCode: 201,
                    message: "Create Success"
                }

                resolve(message)
            } catch (err) {
                let messageError = {
                    statusCode: err.statusCode || 400,
                    message: err.message || `${functionName} CREATE failed [Error] ${err}`
                }
                reject(messageError)
            }


        })
    }

}

module.exports = request