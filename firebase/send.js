
var admin = require("firebase-admin");
const config = require('../config.json');

var serviceAccount = require("../firebase/fundoonotes-f6d37-firebase-adminsdk-6f17x-d9137a7601.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.firebaseDatabaseUrl
});

async function sendNotification(deviceToken, title, note) {
    const payload = {
        notification: {
            title: title,
            body: note
        }
    };
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };
    admin.messaging().sendToDevice(deviceToken, payload, options)
        .then(function (response) {
            console.log("Successfully sent push message:", response);
        })
        .catch(function (error) {
            console.log("Push Notification :", error);
        });
}

module.exports = sendNotification
