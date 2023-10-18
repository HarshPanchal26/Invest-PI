const { mongoose } = require('../config/database');
const { SchemaForPost } = require('../models/FeedModels');
const { SchemaForCommanUserData } = require('../models/signinmodels');
const {findSchemaAndCollection} = require('../services/servicesForAuthentication')
const db = mongoose.connection.useDb('posts');
const dbForUser = mongoose.connection.useDb('users');
const dbForOthers = mongoose.connection.useDb('others');

const publishThoughts = (Obj)=>{
    return new Promise(async(resolve , reject)=>{
        try {
            const Model =  dbForOthers.model('Thoughts', SchemaForPost , 'thoughts');
            const data = await Model.create(Obj); 
            const id = data._id.toString();
            const {Schema , Collection} = findSchemaAndCollection(Obj.authortype);
            const ModelForusers = dbForUser.model('Users' , Schema , Collection);
            await ModelForusers.updateOne({rid :Obj.rid} , {$push : {thoughts :  id}});
            resolve("Your Post has been created");
        } catch (error) {
            console.log("Post Push" , error.message)
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
            const Model =  dbForOthers.model('Thoughts', SchemaForPost , 'thoughts');
            const fetchedPost = await Model.find({});
            let upadatedFetchData = [...fetchedPost];
            for(let i=0;i<upadatedFetchData.length;i++){
                const updatedObj = await modifiRetrivedThoughts(upadatedFetchData[i]);
                upadatedFetchData[i] = updatedObj;
            }
            resolve(upadatedFetchData);
        } catch (error) {
            console.log("error" ,error)
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
            console.log("upadatedFetchData" , upadatedFetchData)
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
            const ModelForPost = dbForOthers.model('Posts', SchemaForPost , 'thoughts');
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
            const ModeForUser = dbForUser.model('Users' , SchemaForCommanUserData , 'common-users-storage');
            const user = await ModeForUser.findOne({_id : object.rid});
            let ObjectToReturn = {
                ...object._doc,
                authorprofile : user.profileImage,
                username : user.username,
                author : user.name
            }
            // console.log("user object" ,ObjectToReturn)
            
            resolve(ObjectToReturn);            
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