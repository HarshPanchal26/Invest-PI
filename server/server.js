require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const cookieparser = require('cookie-parser');
const port = 5000;
const { connectionWithAtlas } = require('./config/database');
const { isAutorized } = require('./middleware/middlewareForAuthentication');
const SignInRoute = require('./routes/signInRoute');
const LogInRoute = require('./routes/logInRoute');
const FeedRoute = require('./routes/FeedRoute');
const LogoutRoute = require('./routes/LogoutRoute');
const ProfileRoute = require('./routes/ProfileRoute');
const ThoughtsRoute = require('./routes/ThoughtsRoute');
const InvestmentRoute = require('./routes/InvestmentRoute');
const RouteForProduct = require('./routes/ProductRoutes');
const controllerForProfile = require('./controller/controllerForProfile');

app.use(bodyparser.json());
app.use(
    bodyparser.urlencoded({
        extended: true,
    }))
app.use(cookieparser());

app.get('/', (req, res) => {
    res.send("I am MAIN Route")
})

app.use('/login', LogInRoute);
app.use('/signin', SignInRoute);
app.use('/feed', FeedRoute);
app.use('/logout', LogoutRoute);
app.use('/profile', ProfileRoute)
app.use('/thoughts', ThoughtsRoute)
app.use('/product', RouteForProduct)
app.use('/investments', InvestmentRoute)
app.get('/api/authorization', isAutorized, controllerForProfile.controllerForPerosnalProfile)

app.get('*', (_req, res) => {
    res.send("Inavlid request")
})
app.post('*', (_req, res) => {
    res.send("Inavlid request")
})

app.listen(port, () => {
    console.log(`Connnected with express server ${port}`)
    connectionWithAtlas()
})

module.exports = app;
