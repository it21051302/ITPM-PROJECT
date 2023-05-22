const router = require("express").Router();
const Food = require("../modules/Food");


//create,Adding function in crud
router.route("/add").post((req,res) =>{
console.log(req.body);
    const foodId = req.body.foodId;
    const foodName = req.body.foodName;
    const Description = req.body.Description;
    const Nutriants = req.body.Nutriants;
    //one way to use the object
    const newFood = new Food({
        foodId :foodId,
        foodName: foodName,
        Description: Description,
        Nutriants: Nutriants
        
    })

    newFood.save().then(() =>{
        res.json("Food added Successfully")
    }).catch((err) =>{
        console.log(err);
    })

})


//viewing the added sales details, read function in crud
router.route("/getAll").get((req,res) => {
    
    Food.find().then((items)=>{
        res.json(items);
    }).catch((err)=>{
        console.log(err);
    })
    
})

//update function in crud
router.route("/update/:foodId").put(async(req,res) =>{

    let FId = req.params.foodId;
    const foodId = Number(req.body.foodId);
    const foodName = req.body.foodName;
    const Description = req.body.Description;
    const Nutriants = req.body.Nutriants;

    //another way to use the object    
    const updateFood = {
        foodId,
        foodName,
        Description,
        Nutriants
    }

    await Food.findByIdAndUpdate(FId,updateFood)
    .then(() =>{
        res.status(200).send({status: "Updated",updateFood})
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Error with updating",error: err.message});
    })

    
})

//delete function
router.route("/deleteFood/:foodId").delete(async(req,res) =>{

    let foodId = req.params.foodId;

    await Food.findByIdAndDelete(foodId)
    .then(() =>{
        res.status(200).send({status: "Food deleted"});
    }).catch((err) =>{
        res.status(500).send({status: "Error with deleting",error: err.message});
    })
})

router.route("/get/:foodId").get(async(req,res) =>{
    let foodId = req.params.foodId;
    const foodItem = await Food.findById(foodId).then((result) =>{
        res.status(200).send({status: "Food fetched",foodItem: result})
    }).catch((err) =>{
        res.status(500).send({status: "Error with fetching",error: err.message});
    })
})

module.exports = router;