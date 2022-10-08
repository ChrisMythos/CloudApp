const mongoose = require('mongoose');
module.exports = {

    connect: async function () {
        console.log("führe db call aus");
        await mongoose.connect("mongodb://root:example@mongo:27017/").then(success => {
            console.log("success");
            console.log(success);
        }).catch(error => {
            console.log("error");
            console.log(error);
        });
        console.log("call fertig");
        // Get the default connection
        const db = mongoose.connection;
        
        

        // Bind connection to error event (to get notification of connection errors)
        db.on("error", console.error.bind(console, "MongoDB connection error:"));


    }
}

