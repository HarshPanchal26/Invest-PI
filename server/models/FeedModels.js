const mongoose = require('mongoose');

const SchemaForPost = new mongoose.Schema({
    rid: {
        type: String,
        required: true,
    },
    thoughts: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        required: false,
        default: 0
    },
    isMedia: {
        type: Boolean,
        required: false,
        default: false
    },
    link: {
        type: String,
        required: false,
        default: ''
    },
    tag: {
        type: Array,
        required: false,
        default: []
    },
    comments: {
        type: Array,
        required: false,
        default: []
    },
    createdTime: {
        type: String,
        require: false,
    },
    createdDate: {
        type: String,
        require: false,
    },

})

SchemaForPost.pre('save', function (next) {
    if (!this.isNew) {
        return next();
    }

    const date = new Date();
    this.createdDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    this.createdTime = date.getHours() + "/" + date.getMinutes() + "/" + date.getSeconds();
    console.log("date and Time ====>",this.createdDate , this.createdTime)
    next();
})


module.exports = { SchemaForPost }