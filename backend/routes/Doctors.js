const router = require("express").Router();
const Doctors = require("../modules/doctors");
const {res} = require("express")
let doctors = require("../modules/doctors");

//create,Adding function in crud
router.route("/add").post((req,res) =>{

    const doctorId = Number(req.body.doctorId);
    const doctorName = req.body.doctorName;
    const doctorAge = Number(req.body.doctorAge);
    const doctorSpecialization = req.body.doctorSpecialization;

    //one way to use the object
    const newDoctor = new Doctors({

        doctorId,
        doctorName,
        doctorAge,
        doctorSpecialization
    })

    newDoctor.save().then(() =>{
        res.json("Doctor Added Successfully")
    }).catch((err) =>{
        console.log(err);
    })

})


//viewing the added sales details, read function in crud
router.route("/getAll").get((req,res) => {
    
    doctors.find().then((items)=>{
        res.json(items);
    }).catch((err)=>{
        console.log(err);
    })
    
})

//update function in crud
router.route("/update/:doctorId").put(async(req,res) =>{

    let DId = req.params.doctorId;
    const doctorId = Number(req.body.doctorId);
    const doctorName = req.body.doctorName;
    const doctorAge = Number(req.body.doctorAge);
    const doctorSpecialization = req.body.doctorSpecialization;

    //another way to use the object    
    const updateDoctors = {
        doctorId,
        doctorName,
        doctorAge,
        doctorSpecialization
    }

    await doctors.findByIdAndUpdate(DId,updateDoctors)
    .then(() =>{
        res.status(200).send({status: "Updated",updateDoctors})
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updating",error: err.message});
    })

    
})

//delete function
router.route("/deleteDoctors/:doctorId").delete(async(req,res) =>{

    let doctorId = req.params.doctorId;

    await doctors.findByIdAndDelete(doctorId)
    .then(() =>{
        res.status(200).send({status: "Doctor deleted"});
    }).catch((err) =>{
        res.status(500).send({status: "Error with deleting",error: err.message});
    })
})

router.route("/get/:doctorId").get(async(req,res) =>{
    let doctorId = req.params.doctorId;
    const doctor = await doctor.findById(doctorId).then((doctor) =>{
        res.status(200).send({status: "Doctor fetched",doctor})
    }).catch((err) =>{
        res.status(500).send({status: "Error with fetching",error: err.message});
    })
})



module.exports = router;