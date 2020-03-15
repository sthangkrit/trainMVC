var sql = require("mssql");
// var moment = require('moment')
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

    async Deposit(req) {
        let functionName = '[Deposit]' //ชื่อ function

        return new Promise(async function (resolve, reject) {

            try {

                var request = new sql.Request();
                var acount = req.acount
                // console.log(acount)
                var acount_id = req.acount_id
                var deposit = req.deposit
                var statusCode = 0;
                var massage = ""
                var check = `SELECT acount, acount_id
FROM sthangDB.dbo.BankAcount WHERE acount = '${acount}' AND acount_id ='${acount_id}'; `
                var result = await request.query(check);
                // console.log(result.recordset[0])
                if ((result.recordset[0]) == undefined) {
                    statusCode = 400
                    massage = "Deposit Fail : acount or acount_id is incorect"
                } else {
                    if (deposit >= 100) {

                        var command = `UPDATE sthangDB.dbo.BankAcount
                SET balance+= '${deposit}' WHERE acount = '${acount}' AND acount_id =  '${acount_id}';`
                        await request.query(command); //ยิง command เข้าไปใน
                        statusCode = 200
                        massage = "Deposit Success : Your Deposit " + deposit + " to Wallet"

                    } else {
                        statusCode = 400
                        massage = "Deposit Fail : Minimum Deposit is 100 Bath"
                    }
                }


                let message = {
                    statusCode: statusCode,
                    message: massage
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

    async Withdraw(req) {
        let functionName = '[Withdraw]' //ชื่อ function

        return new Promise(async function (resolve, reject) {

                try {

                    var request = new sql.Request();
                    var acount = req.acount
                    // console.log(acount)
                    var acount_id = req.acount_id
                    var withdraw = req.withdraw
                    var statusCode = 0;
                    var massage = ""
                    var check = `SELECT acount, acount_id,balance
FROM sthangDB.dbo.BankAcount WHERE acount = '${acount}' AND acount_id ='${acount_id}'; `
                    var result = await request.query(check);
                    // console.log(result.recordset[0])
                    if ((result.recordset[0]) == undefined) {
                        statusCode = 400
                        massage = "Withdraw Fail : acount or acount_id is incorect"
                    } else {
                        // console.log(result.recordset[0].balance)
                        if (withdraw <= result.recordset[0].balance) {
                            if (withdraw % 100 == 0 && withdraw <= 20000) {

                                var command = `UPDATE sthangDB.dbo.BankAcount
                SET balance-= '${withdraw}' WHERE acount = '${acount}' AND acount_id =  '${acount_id}';`
                                await request.query(command); //ยิง command เข้าไปใน
                                statusCode = 200
                                massage = "Withdraw Success : Your Withdraw " + withdraw + " from your Wallet"
                            } else {
                                statusCode = 400
                                massage = "Withdraw Fail : This ATM has only 100,500,1000"
                            }

                        } else {
                            statusCode = 400
                            massage = "Withdraw Fail : Your Withdraw is more than balance"
                        }
                    }


                    let message = {
                        statusCode: statusCode,
                        message: massage
                    }

                    resolve(message)
                } catch (err) {
                    let messageError = {
                        statusCode: err.statusCode || 400,
                        message: err.message || `${functionName} CREATE failed [Error] ${err}`
                    }
                    reject(messageError)
                }


            }
        )
    }

    async Transfer(req) {
        let functionName = '[Withdraw]' //ชื่อ function

        return new Promise(async function (resolve, reject) {

                try {

                    var request = new sql.Request();
                    var acount = req.acount
                    var acount_id = req.acount_id
                    var transfer = req.transfer
                    var sendto = req.sendto
                    var statusCode = 0;
                    var massage = ""
                    var check = `SELECT acount, acount_id,balance
FROM sthangDB.dbo.BankAcount WHERE acount = '${acount}' AND acount_id ='${acount_id}'; `
                    var result = await request.query(check);
                    // console.log(result.recordset[0])


                    if ((result.recordset[0]) == undefined) {
                        statusCode = 400
                        massage = "Transfer Fail : acount or acount_id is incorect"
                    } else {

                        var checksend = `SELECT acount, acount_id,balance
FROM sthangDB.dbo.BankAcount WHERE acount = '${sendto}' ; `
                        var resultsend = await request.query(checksend);
                        if ((resultsend.recordset[0]) == undefined) {
                            statusCode = 400
                            massage = "Transfer Fail : Receiver acount or acount_id is incorect"
                        } else {


                            // console.log(result.recordset[0].balance)
                            if (transfer <= result.recordset[0].balance) {
                                if (transfer <= 1000000) {

                                    var command = `UPDATE sthangDB.dbo.BankAcount
                SET balance -= '${transfer}' WHERE acount = '${acount}' AND acount_id =  '${acount_id}';`
                                    await request.query(command); //ยิง command เข้าไปใน Database

                                    var commandsend = `UPDATE sthangDB.dbo.BankAcount
                SET balance += '${transfer}' WHERE acount = '${sendto}' ;`
                                    await request.query(commandsend); //ยิง command เข้าไปใน Database


                                    statusCode = 200
                                    massage = "Transfer Success : Your Transfer " + transfer + " to " + sendto + " Wallet"
                                } else {
                                    statusCode = 400
                                    massage = "Transfer Fail : Maximum Transfer is 1,000,000 "
                                }

                            } else {
                                statusCode = 400
                                massage = "Transfer Fail : Your Transfer is more than balance"
                            }
                        }
                    }

                    let message = {
                        statusCode: statusCode,
                        message: massage
                    }

                    resolve(message)
                } catch
                    (err) {
                    let messageError = {
                        statusCode: err.statusCode || 400,
                        message: err.message || `${functionName} CREATE failed [Error] ${err}`
                    }
                    reject(messageError)
                }


            }
        )
    }

}

module.exports = request