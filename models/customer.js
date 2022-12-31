const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstname : {type : String},
    lastname : {type : String},
    phoneno : {type : String},
    email : {type : String}
});

//define and export 
const custmodle = new mongoose.model('Customer', customerSchema);
module.exports = custmodle;
