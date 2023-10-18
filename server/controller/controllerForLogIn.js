const mongoose = require('mongoose');
const SchemaForCommanUserData = require('../models/signinmodels')
const { createSession, encryptedPassword } = require('../services/servicesForAuthentication');

const controllerForLogIn = async (req, res) => {
  const { email, password } = req.body
  const db = mongoose.connection.useDb('users');
  const Model = db.model('Users', SchemaForCommanUserData, 'common-users-storage');

  try {
    Model.findOne({ email: email })
      .then(async (user) => {
        console.log("user" , user)
        if (user) {
          console.log("new", user.get('password'));
          let hashedPassword = await encryptedPassword(password);
          // const isPasswordMatch = await bcrypt.compare(hashedPassword, user._doc.password);
          // console.log("Password", hashedPassword)
          if (user._doc.password === hashedPassword && email === user._doc.email) {
            createSession({ uid: user._doc._id, type: user._doc.type })
              .then((token) => {
                console.log("Token has been created" , token)
                res.cookie('access_token', token, {
                  httpOnly: true,
                  secure: true,
                  sameSite: true,
                  maxAge: (1800000)
                })
                res.status(201).json({
                  authenticated: true,
                  message: 'Welcome Back'
                })
              }).catch((error) => {
                res.status(201).json({
                  authenticated: true,
                  message: `${error}`
                })
              })

          } else {
            res.status(401).json({
              authenticated: false,
              message: `Your password or Email might not correct`
            })
          }
        } else {
          res.status(401).json({
            authenticated: false,
            message: `Network Error`
          })
        }
      })

  } catch (error) {
    res.status(401).json({
      authenticated: false,
      message: `Network Error ${error}`
    })
  }
}
module.exports = controllerForLogIn;



