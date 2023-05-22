const mongoose = require ('mongoose');
const internal = require('stream');

const Schema = mongoose.Schema;

const staffprofileSchema = new Schema({
     name :{
        type :String,
        required : true
     },
     experience :{
        type :String,
        required : true
     },
     qualification:{
        type :String,
        required : true
     },
     department :{
        type :String,
        required : true
     }


})

const Staffprofile = mongoose.model("staffprofile",staffprofileSchema);

module.exports = Staffprofile;