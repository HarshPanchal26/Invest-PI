require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const cookieparser = require('cookie-parser');
const cors = require('cors')
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
const {ServerSocket} = require('./socketio.js')

app.use(cors());
app.use(bodyparser.json());
app.use(
    bodyparser.urlencoded({
        extended: true,
    }))
app.use(cookieparser());


// const socketIO = require('socket.io')(httpSever, {
//     transports: ['websocket'],
//     serveClient: false,
//     pingInterval: 10000,
//     pingTimeout: 5000,
//     cookie: false,
//     cors: {
//         origin: "*"
//     }
// });

// //Add this before the app.get() block
// socketIO.on('connection', (socket) => {
//     console.log(`⚡: ${socket.id} user just connected!`);
//     socket.on("connect_error", (e) => {
//         console.log(e);
//      });
//     socket.on('disconnect', () => {
//         console.log('🔥: A user disconnected');
//     });
// });

// const httpSever = require('http').createServer(app);
// const io = require('socket.io')(httpSever, {
//     // path: 'http://localhost:3000',
//     serveClient: false,
//     pingInterval: 10000,
//     pingTimeout: 5000,
//     cookie: false,
//     cors: {
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST']
//     }
// })

// try {
//     io.on('connection', (socket) => {
//         console.log('user connected');
//         socket.on('disconnect', function () {
//             console.log('user disconnected');
//         });
//     })
// } catch (error) {
//     console.log("Error while connection is ", error)
// }



// require('./socketio.js')(io);


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

const httpSever = app.listen(port, () => {
    console.log(`Connnected with express server ${port}`)
    connectionWithAtlas()
})

new ServerSocket(httpSever)

module.exports = app;
