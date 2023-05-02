const mongoose = require('mongoose');

const schema = mongoose.Schema;

const AppointmentsSchema = new schema({

    appointmentId :{
        type : Number,
        required : true
    },

    paitentName :{
        type : String,
        required : true
    },

    paitentAge :{
        type : Number,
        required : true
    },

    patientAddress :{
        type : String,
        required : true
    },

    patientIssue :{
        type : String,
        required : true
    }

})

const Appointments = mongoose.model("Appointments",AppointmentsSchema);

module.exports = Appointments;