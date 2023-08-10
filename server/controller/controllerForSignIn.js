const SignInServices = require('../services/servicesForAuthentication')

const ContollerForSignIn = async(req , res)=>{
  const {authenticationData , details} = req.body;
  const {email , password , type } = authenticationData;
  try {
        const hashpassword = await SignInServices.encryptedPassword(password)
        const signUp = await SignInServices.createUser({email : email , password : hashpassword ,type : type} , details); 
        console.log("signUp" , signUp)   
        if(signUp?.token){
            res.cookie('access_token' , signUp.token , {
                httpOnly : true, // To prevent access from javascript 
                secure : true, //For secure connection 
                sameSite : true, //To limit cross site request 
                maxAge : 1800000 // vanish after 1/2 hour 
            })
            res.status(200).json({
                status : true,
                verified: true,
                token : true,
                message : 'Sign In Completed'
            })    
        }else{
            res.status(200).json({
                status : true,
                verified: true,
                token : false,
                message : 'Sign In Completed But token is not generated please login'
            })    

        }
  } catch (error) {
    console.log("error" , error)
    res.status(200).json({
        status : false,
        verified: false,
        token : false,
        message : error
    })
  }
}
module.exports = ContollerForSignIn;



