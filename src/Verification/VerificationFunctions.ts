

export const verifyAllFeilds = (Obj : Object)=> {
    return new Promise((resolve , reject)=>{
        const values = Object.values(Obj);
        for (var x in values) {
            if (!values[x]) {
             reject(new Error(`${Object.keys(Obj)[x]} should not be empty`))
            }
        }
        resolve({
            type : 'None',
            message : `All Feilds are Feiled`,
            Verified : true
        })
    }) 
}

export const checkEmail =  (email : string)=>{
    return new Promise((resolve , reject)=>{

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
                reject(new Error('Invalid email Address , Please Enter valid one'))
            }

            resolve({
                type : 'None',
                message : `Email is proper`,
                Verified : true
            })
          
    })
}


export const checkPasswordMatch = (password : string , cpassword : string)=>{
    return new Promise((resolve , reject)=>{
        if (password !== cpassword) {
            console.log("Inavlid Password")
            reject(new Error('Password are not matching'))
        }
        resolve({
            type : 'None',
            message : `Passowrds are proper`,
            Verified : true
        })

    })
}
        

export const checkValidString = (obj : Object) =>{
    const stringRegx = /^[^0-9]*$/;
    let vlaues = Object.values(obj);
    return new Promise((resolve , reject)=>{

        for(var x in vlaues){
            if(!stringRegx.test(vlaues[x])){
                reject(new Error(`No Special charachter or Numeric value is allowed for ${Object.keys(obj)[x]}`))
            }
        }
        resolve({
            type : 'None',
            message : `Ebverything is Up to date`,
            Verified : true
        })
    })    
    
}

export const checkForValidPhoneNumber = (number: string) =>{
    const stringRegx = /^[0-9]*$/;
    return new Promise((resolve , reject)=>{
        
            if(!stringRegx.test(number)){
             reject(new Error(`Only Numeric values are allowed for Phone Number`))
            }
            if(number.length !== 10){
                reject(new Error(`Phone number should be if 10 digits`))
            }
        resolve({
            type : 'None',
            message : `Ebverything is Up to date`,
            Verified : true
        })
    })    
    
}

export const checkForZIPCode = (number : string)=>{
    const stringRegx = /^[0-9]*$/;

    return new Promise((resolve , reject)=>{
        
        if(!stringRegx.test(number)){
         reject(new Error(`Only Numeric values are allowed for Phone Number`))
        }
        if(number.length  < 6){
            reject(new Error(`Phone number should be if 10 digits`))
        }
    resolve({
        type : 'None',
        message : `Ebverything is Up to date`,
        Verified : true
    })
})       
}