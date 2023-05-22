const router = require("express").Router();
let staffprofile =require("../models/Staffprofile");


router.route("/add").post((req,res)=>{
    console.log(req.body);
    const firstname = req.body.firstname;
    const lastname  = req.body.lastname;
    const  email = req.body.email;
    const question = req.body.question;
    const password = req.body.password;

    const newstaffprofile = new staffprofile({
        firstname,
        lastname,
        email,
        password,
        question
    })
    //new item add
    newstaffprofile.save().then(()=>{
    res.json("NewItem add")
}).catch((err)=>{
    console.log(err);
})

})
//read

router.route("/get").get((req,res)=>{

    staffprofile.find().then((staffprofile)=>{
    res.json(staffprofile)
}).catch((err)=>{
    console.log(err)
})

})
//update

router.route("/update/:id").put(async(req,res)=>{
    let userID = req.params.id;
    
    const{firstname, lastname, email,question}=req.body;

    const updatestaffprofile = {
        firstname,
        lastname, 
        email,
        question
    }
    const update =await staffprofile.findByIdAndUpdate(userID, updatestaffprofile)
    .then(()=>{
        res.status(200).send({status: "user updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({Status: "Error with updatinh data",error:err.message});
    })
})
//delete
router.route("/delete/:id") .delete(async(req,res) =>{
    let userID =req.params.id;

    await staffprofile.findByIdAndDelete(userID).then(() =>{
        res.status(200).send({status: "user deleted"});

    }).catch((err) =>{
    console.log(err.message);
        res.status(500).send({status:"Error with deleting data",error:err.message});
    })

})
router.route("/get/:id").get(async(req,res)=> {
    let userID =req.params.id;
    const user = await staffprofile.findById(userID)
    .then((staffprofilei)=>{
        res.status(200).send({status:"user fetched",userID})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get user",error:err.message});
    })
    
})
module.exports = router;


