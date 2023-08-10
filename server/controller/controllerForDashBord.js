const controllerForHomePage = async(req , res)=>{
    console.log("header is here ====>" , req?.headers['Access-id'])   
    try {   
                                             
    } catch (error) {
        
    }
    res.json({
        Autorization: true,
        message: "Done"
    })    
}

const controllerForWorkPlace = ()=>{

}


module.exports = {controllerForHomePage , controllerForWorkPlace};