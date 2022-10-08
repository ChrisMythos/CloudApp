const mongoose = require('mongoose');
module.exports = {

    connect: async function () {
        console.log("führe db call aus");
        await mongoose.connect("mongodb://asa").then(success => console.log(success)).catch(error => console.log(error));
        console.log("call fertig");

    }
}

