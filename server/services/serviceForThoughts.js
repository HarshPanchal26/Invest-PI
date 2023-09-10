const { mongoose } = require('../config/database');
const { SchemaForPost } = require('../models/FeedModels');
const db = mongoose.connection.useDb('posts');

const publishThoughts = (Obj)=>{
    return new Promise(async(resolve , reject)=>{
        try {
            const Model =  db.model('Thoughts', SchemaForPost , 'thoughts');
            await Model.create(Obj);
            resolve("Your Post has been created");
        } catch (error) {
            reject({
                posted : false,
                error : error.message
            })
        }
    })
}


const fetchThoughts = ()=>{
    return new Promise(async(resolve , reject)=>{
        try {
            const Model =  db.model('Thoughts', SchemaForPost , 'thoughts');
            const fetchedPost = await Model.find();
            resolve(fetchedPost);
        } catch (error) {
            reject({
                posted : false,
                error : error.message
            })
        }
    })    
}

const updateThoughts = () =>{

}

const deleteThoughts = ()=>{

}

const addThoughtsInArray = ()=>{
    
}

module.exports = {publishThoughts , updateThoughts , deleteThoughts , fetchThoughts}