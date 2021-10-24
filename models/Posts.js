const mongoose =  require("mongoose");

const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique:true
    },
    description:{
        type: String,
        required: true,
        
    },
    category:{
        type: String,
        required: true,
      

    },
    photo:{ 
        type: String,
        unique: true
    }


},{timestamps: true});

module.exports = mongoose.model("Post", PostSchema)
