const SignInServices = require('../services/servicesForAuthentication')

const ContollerForSignIn = async(req , res)=>{
  const {authenticationData , details} = req.body;
  const {email , password , type , username, name } = authenticationData;
  try {
        const hashpassword = await SignInServices.encryptedPassword(password)
        const signUp = await SignInServices.createUser( details , {
            name :  name,
            email : email ,
            password : hashpassword ,
            type : type,
            username : username
          }); 
        if(signUp?.token){
            res.cookie('access_token' , signUp.token , {
                httpOnly : true, // To prevent access from javascript 
                secure : true,   //For secure connection 
                sameSite : true, //To limit cross site request 
                maxAge : (1800000) // vanish after 1 hour 
            })
            res.status(200).json({
                status : true,
                authorization : true,
                additionalData: true,
                message : 'Sign In Completed'
            })    
        }
  } catch (error) {
    console.log("error" , error)
    res.status(401).json(error)
  }
}
module.exports = ContollerForSignIn;



