var Vonage = require('@vonage/server-sdk')
const ip = require('ip')
const ipAddress = ip.address()
console.log(ipAddress);
require('dotenv').config();
var vonage = new Vonage({
    apiKey: process.env.SMS_APIKEY,
    apiSecret: process.env.SMS_APL_SCRETKEY,
})
var sms = (data) => {
    var from = "Vonage APIs"
    var to = "918488807690"
    var text = `${data},${ipAddress}` || `null`

    vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if (responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.",text);
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
}


module.exports = sms