const mongoose = require('mongoose');
var imgModel = require('./model');
module.exports = {

    connect: function () {
        // connect to db
        mongoose.connect("mongodb://root:example@mongo:27017/",
            { useNewUrlParser: true, useUnifiedTopology: true }, err => {
                console.log('connected')
            });
        console.log("call fertig");
    }
}

