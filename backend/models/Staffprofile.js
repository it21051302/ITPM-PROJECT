const mongoose = require ('mongoose');
const internal = require('stream');

const Schema = mongoose.Schema;

const staffprofileSchema = new Schema({
     firstname:{
        type :String,
        required : true
     },
     question:{
        type :String,
        
     },
     email:{
        type :String,
        required : true
     },
     password:{
        type :String, 
     }


})

const Staffprofile = mongoose.model("staffprofile",staffprofileSchema);

module.exports = Staffprofile;