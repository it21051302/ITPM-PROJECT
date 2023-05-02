const mongoose = require('mongoose');

const schema = mongoose.Schema;

const FoodsSchema = new schema({

    foodId :{
        type : Number,
        required : true
    },

    foodName :{
        type : String,
        required : true
    },

    Description :{
        type : String,
        required : true
    },

    Nutriants :{
        type : String,
        required : true
    }

})

const Food = mongoose.model("Food",FoodsSchema);

module.exports = Food;