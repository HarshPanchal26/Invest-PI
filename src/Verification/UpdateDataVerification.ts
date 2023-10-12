type TypeForUpdatedCFData = {
    about: '',
    headquarters: '',
    link: '',
    city: '',
    state: '',
    country: '',
}

type TypeForUpdatedMainData = {
    name : string,
    username : string,
    bio : string,
}

export const VerificationForAboutDataOfCF = (Obj: TypeForUpdatedCFData) => {
    return new Promise(async (resolve , reject) => {
        try {
            await verifyAllFeilds(Obj);
            await ChechAboutSection(Obj.about);
            resolve({
                verify : true,
                message : 'No Erro'
            })
        } catch (error) {
            reject({
                verify : false,
                message : error
            })
        }
    })
}

export const VerificationForMainDataOfCF = (Obj : TypeForUpdatedMainData)=>{
    return new Promise(async(resolve , reject)=>{
        try {
            await verifyAllFeilds(Obj);
            resolve('Done')
        } catch (error : any) {
            reject(error)
        }       
    })
}

export const ChechAboutSection = (value: string) => {
    return new Promise((resolve, reject) => {
        let array = value.split(' ');
        if (array.length > 251) resolve('About is Done')
        else reject('About Section should have atlest 250 words')
    })
}

export const verifyAllFeilds = (Obj: Object) => {
    return new Promise((resolve, reject) => {
        const values = Object.values(Obj);
        for (var x in values) {
            if (!values[x]) {
                reject(`${Object.keys(Obj)[x]} should not be empty`)
            }
        }
        resolve({
            type: 'None',
            message: `All Feilds are Feiled`,
            Verified: true
        })
    })
}

export const nothing = () => {

}