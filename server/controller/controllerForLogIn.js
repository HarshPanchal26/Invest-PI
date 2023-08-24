const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SchemaForCommanUserData = require('../models/signinmodels')
const {createSession ,encryptedPassword} = require('../services/servicesForAuthentication');

const controllerForLogIn = async(req , res)=>{
   console.log("Res Object" , req.body);
   const {email,password} = req.body
   const db = mongoose.connection.useDb('users');
   const Model = db.model('Users', SchemaForCommanUserData, 'common-users-storage');
   
   try {
    // const user = await 
    Model.findOne({ email : email})
    .then(async(user)=>{
      if(user){
        console.log("new" ,user.get('password'));
        let hashedPassword = await encryptedPassword(password);
        // const isPasswordMatch = await bcrypt.compare(hashedPassword, user._doc.password);
        console.log("Password" , hashedPassword)
        if(user._doc.password === hashedPassword  && email === user._doc.email){
           createSession({ uid: user._doc._id , type : user._doc.type})
           .then((token)=>{
            res.cookie('access_token' , token , {
              httpOnly : true,  
              secure : true,    
              sameSite : true,  
              maxAge : (1800000)  
            }) 
            res.status(201).json({
              authenticated : true,
              message : 'Welcome Back'
            })
           }).catch((error)=>{
            res.status(201).json({
              authenticated : true,
              message : `${error}`
            })
           })
  
        }else{
          res.status(401).json({
            authenticated : false,
            message : `Your password or Email might not correct`
          })
        }
      }else{
        res.status(401).json({
          authenticated : false,
          message : `Network Error`
        })
      } 
    })
    
   } catch (error) {
    res.status(401).json({
      authenticated : false,
      message : `Network Error ${error}`
    })
   }
}
module.exports = controllerForLogIn;





// try {
//   const user = await Model.findOne({ email });
//   if(user){
//     console.log("check2: " , user);  
//     let hashedPassword = await encryptedPassword(password);
//     console.log("check: " , hashedPassword);  
//     console.log("check2: " , user.password);  
//     console.log("user is here " , hashedPassword === user.password);  
//     if(hashedPassword === user.password && email === user.email){
//       let token = await createSession({ uid: user._id , type : user.type});
//         if(token){
//           res.cookie('access_token' , token , {
//             httpOnly : true, // To prevent access from javascript 
//             secure : true,   //For secure connection 
//             sameSite : true, //To limit cross site request 
//             maxAge : 1800000 // vanish after 1/2 hour 
//           })
//           res.status(201).json({
//             authenticated : true,
//             message : 'Welcome Back'
//           })

//         }
//     }else{
//       res.status(401).json({
//         authenticated : user,
//         message : 'Your Email or password might not correct'
//       })
//     }
        
//   }else{
//     res.status(401).json({
//       authenticated : false,
//       message : 'Your Email or password might not correct'
//     })             
//   }
// } catch (error) {
// res.status(401).json({
// authenticated : false,
// message : 'Your Email or password might not correct'
// })    
// }