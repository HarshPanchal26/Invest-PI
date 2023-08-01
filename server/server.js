require('dotenv').config()
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const cookieparser = require('cookie-parser');
const port = process.env.Port;
const {connectionWithAtlas} = require('./config/database')

const SignInRoute = require('./routes/signInRoute')

app.use(bodyparser.json());
app.use(
    bodyparser.urlencoded({
    extended: true,
}))
app.use(cookieparser());


app.use('/' , SignInRoute);

app.listen(port , ()=>{
    console.log(`Connnected with express server ${port}`)
    connectionWithAtlas()
})

module.exports = app;
