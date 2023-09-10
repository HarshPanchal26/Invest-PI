const { storageForFirebase } = require('../config/firebaseService')
const { ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage')

const UploadImageOnFirebabe = async (file, parent , createdAt) => {

    return new Promise(async (resolve, reject) => {

        try {
            // Replace with your bucket path
            const parentRef = ref(storageForFirebase, 'gs://projectpi-fa7b4.appspot.com/');
            const postAssets = ref(parentRef, `${parent}/${file.originalname}_${createdAt}`);
            
            const metadata = {
                contentType: 'image/jpeg'
            };

            const uploadTask =  uploadBytesResumable(postAssets, file.buffer, metadata);

            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload progress: ${progress}%`);
            } , (error)=>{
                  console.log("New error" , error)  
            } , ()=>{
                  getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
                      console.log('File uploaded and URL retrieved:', url);
                      resolve({ URL: url })

                  }).catch((error)=>{
                    console.log("error For URL creation" , error)
                  })    
            });


        } catch (error) {
            reject({
                pulishes: false,
                message: error.message
            })
            console.error('Error in file upload:', error);
        }
    })
}



module.exports = { UploadImageOnFirebabe };