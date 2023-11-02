const jwt = require('jsonwebtoken');


const controllerForLogOut = async(req , res)=>{
    let token = req.cookies['access_token'];
    if(token){
        try {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {     
                if (err) {
                    res.status(401).json({
                        authorization : false,
                        logout : false,
                        message : 'You Token is not valid , You can login again and check.'
                    })
                } else {
                    console.log("decoded token " , decoded.uid)
                    res.cookie('access_token' ,'' , {   
                        httpOnly : true, // To prevent access from javascript   
                        secure : true,   // For secure connection   
                        sameSite : true, // To limit cross site request       
                        expires : new Date(0)
                    })

                    console.log(`User ${decoded.uid} is now loged out`)

                    res.status(201).json({
                        authorization : true,
                        logout : true,
                        message : 'You atr now log out , You Can login any time you want.'
                    })
                }
            })
        } catch (error) {
            res.json({
                authorization : false,
                logout : false,
                message : `${error.message}`
            })
        }
    }else{
        res.status(401).json({
            authorization : false,
            message : 'You Need to Login or create accoutn first'
        })
    }
    
}

module.exports = controllerForLogOut;
