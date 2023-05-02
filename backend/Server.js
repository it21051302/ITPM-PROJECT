// const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv  = require("dotenv");
const express = require("express");
const app = express();

require("dotenv").config();


const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect( URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true, 
        useFindAndModify: false 
        
    });

//database
// mongoose.connect( URL, 
// {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,   
// });


const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb connection successful!");
})
 
const doctorsRouter = require("./routes/Doctors.js");
app.use("/doctors",doctorsRouter);

const appoinmentsRouter = require("./routes/Appointments.js");
const { Server } = require("http");
app.use("/appointments",appoinmentsRouter);


app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
    
});

