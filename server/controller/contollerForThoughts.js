const ServiceForThoughts = require('../services/serviceForThoughts')
const ServiceForFirebase = require('../services/serviceForFirebase');

const controllerForCreateThoughts = async (req, res) => {

  const { uid, type } = res.locals;
  const mediaFile = req.files?.['image']?.[0]
  const metaData = JSON.parse(req.body['data']);

  console.log("Parsed Image ", mediaFile);
  console.log("Parsed data ", metaData);

  let createdAt = new Date().getTime();

  const ObjectForPost = {
    rid: uid,
    thoughts: metaData.thoughts ,
    isMedia: metaData.isMedia,
    link: '',
  }

  try {
    if (mediaFile && ObjectForPost.isMedia) {
      const result = await ServiceForFirebase.UploadImageOnFirebabe(mediaFile, 'posts' , createdAt);
      console.log("URL", result.URL)
      ObjectForPost.link = result.URL;
    }
    await ServiceForThoughts.publishThoughts(ObjectForPost);
    res.status(201).json({
      publishes: true,
      message: 'Your Post has been created'
    })
  } catch (error) {
    res.status(401).json({
      publishes: false,
      message: error.message
    })
  }
}

const controllerForUpdateThoughts = () => {

}

module.exports = { controllerForCreateThoughts, controllerForUpdateThoughts }