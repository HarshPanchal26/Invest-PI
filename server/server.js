require('dotenv').config()
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const cookieparser = require('cookie-parser');
// const port = process.env.port | 3001;
const port = 5000;
const {connectionWithAtlas} = require('./config/database')
const SignInRoute = require('./routes/signInRoute')
const LogInRoute = require('./routes/logInRoute')

app.use(bodyparser.json());
app.use(
    bodyparser.urlencoded({
    extended: true,
}))
app.use(cookieparser());

app.get('/' , (req,res)=>{
    res.send("I am MAIN Route")
})
    
app.use('/login', LogInRoute);
app.use('/signin', SignInRoute);

app.get('*', (_req, res)=>{
 res.send("Inavlid request")
})

app.listen(port , ()=>{
    console.log(`Connnected with express server ${port}`)
    connectionWithAtlas()
})

module.exports = app;
