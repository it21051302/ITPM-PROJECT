const mongoose = require('mongoose');

const schema = mongoose.Schema;

const DoctorsSchema = new schema({
    doctorId :{
        type : Number,
        required : true
    },

    doctorName :{
        type : String,
        required : true
    },

    doctorAge :{
        type : Number,
        required : true
    },

    doctorSpecialization :{
        type : String,
        required : true
    }

})

const Doctors = mongoose.model("Doctors",DoctorsSchema);

module.exports = Doctors;