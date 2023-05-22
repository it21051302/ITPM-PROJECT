const router = require("express").Router();
let Userprofile = require("../models/Userprofile");

router.route("/add").post((req, res) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  const userimage = req.body.userimage;
  const dob = req.body.dob;
  const newUserprofile = new Userprofile({
    firstname,
    lastname,
    email,
    password,
    userimage,
    dob,
  });
  //new item add
  newUserprofile
    .save()
    .then(() => {
      res.json("New User added");
    })
    .catch((err) => {
      console.log(err);
    });
});
//read

router.route("/get").get((req, res) => {
  Userprofile.find()
    .then((Userprofile) => {
      res.json(Userprofile);
    })
    .catch((err) => {
      console.log(err);
    });
});
//update

router.route("/update/:id").put(async (req, res) => {
  let userID = req.params.id;

  const { firstname, lastname, email, password, userimage, dob } = req.body;

  const updateUserprofile = {
    firstname,
    lastname,
    email,
    password,
    userimage,
    dob,
  };
  const update = await Userprofile.findByIdAndUpdate(userID, updateUserprofile)
    .then(() => {
      res.status(200).send({ status: "user updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ Status: "Error with updating data", error: err.message });
    });
});
//delete
router.route("/delete/:id").delete(async (req, res) => {
  let userID = req.params.id;

  await Userprofile.findByIdAndDelete(userID)
    .then(() => {
      res.status(200).send({ status: "user deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with deleting data", error: err.message });
    });
});
router.route("/get/:id").get(async (req, res) => {
  let userID = req.params.id;
  const user = await Userprofile.findById(userID)
    .then((Userprofilei) => {
      res.status(200).send({ status: "user fetched", userID });
    })
    .catch(() => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get user", error: err.message });
    });
});
module.exports = router;
