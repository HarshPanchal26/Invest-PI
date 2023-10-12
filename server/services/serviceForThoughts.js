const { mongoose } = require('../config/database');
const { SchemaForPost } = require('../models/FeedModels');
const {findSchemaAndCollection} = require('../services/servicesForAuthentication')
const db = mongoose.connection.useDb('posts');
const dbForUser = mongoose.connection.useDb('users');

const publishThoughts = (Obj)=>{
    return new Promise(async(resolve , reject)=>{
        try {
            const Model =  db.model('Thoughts', SchemaForPost , 'thoughts');
            const data = await Model.create(Obj); 
            const id = data._id.toString();
            const {Schema , Collection} = findSchemaAndCollection(Obj.authortype);
            const ModelForusers = dbForUser.model('Users' , Schema , Collection);
            await ModelForusers.updateOne({rid :Obj.rid} , {$push : {thoughts :  id}});
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
            const fetchedPost = await Model.find({});
            let upadatedFetchData = [...fetchedPost];
            for(let i=0;i<upadatedFetchData.length;i++){
                const updatedObj = await modifiRetrivedThoughts(upadatedFetchData[i]);
                upadatedFetchData[i] = updatedObj;
            }
            resolve(upadatedFetchData);
        } catch (error) {
            reject({
                posted : false,
                error : error.message
            })
        }
    })    
}
const fetchSingleThought = (id)=> {
    return new Promise(async(resolve , reject)=>{
        try {
            const Model =  db.model('Thoughts', SchemaForPost , 'thoughts');
            const fetchedPost = await Model.find({_id  : id});
            let upadatedFetchData = [...fetchedPost];
            for(let i=0;i<upadatedFetchData.length;i++){
                const updatedObj = await modifiRetrivedThoughts(upadatedFetchData[i]);
                upadatedFetchData[i] = updatedObj;
            }
            resolve(upadatedFetchData);
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

const fetchThoughtsForUser = (id)=>{
    return new Promise(async(resolve ,reject)=>{
        try {
            const ModelForPost = db.model('Posts', SchemaForPost , 'thoughts');
            const Thought = await ModelForPost.find({rid : id});
            resolve(Thought);
        } catch (error) {
            reject(error.message);
        }
    })
}


const modifiRetrivedThoughts = (object)=>{
    //this function add author related infromation inside fetched post
    return new Promise(async(resolve , reject)=>{
        try {
            const {Schema , Collection} = findSchemaAndCollection(object.authortype);
            const ModeForUser = dbForUser.model('Users' , Schema , Collection);
            const user = await ModeForUser.findOne({rid : object.rid});
            object.authorprofile = user.profileImage;
            object.username = user.username;
            object.author = user.companyname || user.firmname || user.firstName +" "+ user.lastName;
            resolve(object);            
        } catch (error) {
            reject(error.message)
        }

    })
}

module.exports = {publishThoughts ,
     updateThoughts ,
      deleteThoughts , 
      fetchThoughts,
      fetchThoughtsForUser ,
      fetchSingleThought
    }