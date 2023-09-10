const mongoose = require('mongoose');

const SchemaForPost = new mongoose.Schema({
    rid : {
        type: String,
        required: true,        
    },
    username : {
        type: String,
        required: true,                
    },
    author : {
        type: String,
        required: true,                        
    },
    authortype : {
        type: String,
        required: true,                        
    },
    thoughts : {
        type: String,
        required: true,        
    },
    likes : {
        type: Number,
        required: false,
        default : 0        
    },
    isMedia : {
        type: Boolean,
        required: false,
        default : false             
    },
    link : {
        type: String,
        required: false,
        default : ""             
    },
    tag : {
        type: Array,
        required: false,
        default : []             
    },
    comments : {
        type: Array,
        required: false,
        default : []             
    },
    createdAt : {
      type : Date,
      require : false,
      default : new Date()    
    },
    
})


module.exports = {SchemaForPost}