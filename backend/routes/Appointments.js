const router = require("express").Router();
const Appointments = require("../modules/appointments");
const {res} = require("express")
let appointments = require("../modules/appointments");

//create,Adding function in crud
router.route("/add").post((req,res) =>{

    const appointmentId = Number(req.body.appointmentId);
    const paitentName = req.body.paitentName;
    const paitentAge = Number(req.body.paitentAge);
    const patientAddress = req.body.patientAddress;
    const patientIssue = req.body.patientIssue;
    //one way to use the object
    const newAppointments = new Appointments({

        appointmentId,
        paitentName,
        paitentAge,
        patientAddress,
        patientIssue
    })

    newAppointments.save().then(() =>{
        res.json("Appointment Made Successfully")
    }).catch((err) =>{
        console.log(err);
    })

})


//viewing the added sales details, read function in crud
router.route("/getAll").get((req,res) => {
    
    appointments.find().then((items)=>{
        res.json(items);
    }).catch((err)=>{
        console.log(err);
    })
    
})

//update function in crud
router.route("/update/:appointmentId").put(async(req,res) =>{

    let AId = req.params.appointmentId;
    const appointmentId = Number(req.body.appointmentId);
    const paitentName = req.body.paitentName;
    const paitentAge = Number(req.body.paitentAge);
    const patientAddress = req.body.patientAddress;
    const patientIssue = req.body.patientIssue;

    //another way to use the object    
    const updateAppointments = {
        appointmentId,
        paitentName,
        paitentAge,
        patientAddress,
        patientIssue
    }

    await appointments.findByIdAndUpdate(AId,updateAppointments)
    .then(() =>{
        res.status(200).send({status: "Updated",updateAppointments})
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updating",error: err.message});
    })

    
})

//delete function
router.route("/deleteAppointments/:appointmentId").delete(async(req,res) =>{

    let appointmentId = req.params.appointmentId;

    await appointments.findByIdAndDelete(appointmentId)
    .then(() =>{
        res.status(200).send({status: "Appointment Canceled"});
    }).catch((err) =>{
        res.status(500).send({status: "Error with deleting",error: err.message});
    })
})

router.route("/get/:appointmentId").get(async(req,res) =>{
    let appointmentId = req.params.appointmentId;
    const appointments = await appointments.findById(appointmentId).then((appointments) =>{
        res.status(200).send({status: "Appointment fetched",appointments})
    }).catch((err) =>{
        res.status(500).send({status: "Error with fetching",error: err.message});
    })
})



module.exports = router;