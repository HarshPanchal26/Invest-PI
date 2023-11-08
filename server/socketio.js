const { Server } = require('socket.io');
const { v4 } = require('uuid');
const cookieParser = require('cookie');
const jwt = require('jsonwebtoken');

class ServerSocket {
    instance;
    io;
    users;
    socketInstnace;
    constructor(server) {
        this.instance = this;
        this.users = [];
        this.io = new Server(server, {
            serveClient: false,
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false,
            cors: {
                origin: ['*', 'https://admin.socket.io']
            }
        });

        this.io.use((socket, next) => {
            try {
                const cookies = socket.request.headers.cookie;
                const parsedCookies = cookieParser.parse(cookies)['access_token'];
                jwt.verify(parsedCookies, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                    if (err) {
                        console.log("Error is ", err)
                        next(new Error(err));
                    } else {
                        const { original_id, indexOfUser } = this.findUserSocketId(decoded.uid);
                        if (original_id === null) {
                            let objForUser = {
                                original_id: socket.id,
                                custom_id: decoded.uid
                            }
                            this.users.push(objForUser);
                        } else {
                            this.users[indexOfUser].original_id = socket.id;
                        }
                        console.log("this.users", this.users)
                        next();
                    }
                })
            } catch (error) {
                console.log("error is here", error)
                next(new Error(error));
            }
        })
        this.io.on('connect', (socket) => {
            console.log('User is connected with ' + this.io.engine.clientsCount);
            this.socketInstnace = socket;
            socket.on('send-message', (message, cb) => {
                cb("Thanks Harsh for youre responce")
            })
        });
    }

    forCheck = () => {
        console.log("Inside a fucntion YESSSSSSSSSSSSS")
        try {
            this.io.emit('checkMessage', "Hello This migh works");
        } catch (error) {
            console.log("Inside a fucntion", error)
        }
    }


    StartListeners = (socket) => {

        console.log('Message received from ' + socket.id);

        socket.on('handshake', (callback) => {
            console.info('Handshake received from: ' + socket.id);

            const reconnected = Object.values(this.users).includes(socket.id);

            if (reconnected) {
                console.info('This user has reconnected.');

                const uid = this.GetUidFromSocketID(socket.id);
                const users = Object.values(this.users);

                if (uid) {
                    console.info('Sending callback for reconnect ...');
                    callback(uid, users);
                    return;
                }
            }

            const uid = v4();
            this.users[uid] = socket.id;

            const users = Object.values(this.users);
            console.info('Sending callback ...');
            callback(uid, users);

            this.SendMessage(
                'user_connected',
                users.filter((id) => id !== socket.id),
                users
            );
        });

        socket.on('disconnect', () => {
            console.info('Disconnect received from: ' + socket.id);

            const uid = this.GetUidFromSocketID(socket.id);

            if (uid) {
                delete this.users[uid];

                const users = Object.values(this.users);

                this.SendMessage('user_disconnected', users, socket.id);
            }
        });
    };

    triggerNotificationForNewInvestment = (sendTo, ArrayForInvestorsId, idOfInvestmentDocument, idForClaimDocument) => {
        if (Array.isArray(sendTo)) {
            for (let i = 0; i < sendTo.length; i++) {
                let {original_id } = this.findUserSocketId(sendTo[i]);
                if (original_id !== null) {
                    this.io.to(sendTo[i]).emit('new-investments', idOfInvestmentDocument)
                }
            }
        } else {
            this.io.emit('new-investments', idOfInvestmentDocument)
        }

        for (let i = 0; i < ArrayForInvestorsId.length; i++) {
            let {original_id }= this.findUserSocketId(ArrayForInvestorsId[i]);
            if (original_id) {
                console.log("I AM GOING TO TRIGGER HIM" , original_id)
                this.io.to(original_id).emit('claim-investor', idForClaimDocument)
            }
        }
    }

    triggerNotificatioinForCounterOffers = (custom_id , idOfCounterOfferNotoficationDocumens) =>{
        const { original_id } = this.findUserSocketId(custom_id);
        this.io.to(original_id).emit('new-counterOffer', idOfCounterOfferNotoficationDocumens)        
    }
    
    triggerNotificatioinForResultOfCounterOffer = (OfferMakees_custom_id , idOfCounterOfferNotoficationDocumens)=>{
        const { original_id } = this.findUserSocketId(OfferMakees_custom_id);
        this.io.to(original_id).emit('action-on-counterOffer', idOfCounterOfferNotoficationDocumens)        
    }

    triggerNotificatioinForResultOfClaimInvestor = (CompanyID ,Accepter_id , idOfInvetsmentDoc)=>{
        const { original_id } = this.findUserSocketId(CompanyID);
        this.io.to(original_id).emit('action-on-claimInvestor', idOfInvetsmentDoc , Accepter_id)        
    }
    
    triggerNotificationForNewPost = (custom_id) => {
        const { original_id } = this.findUserSocketId(custom_id)
        this.io.to(original_id).emit('new-posts', `HEY NEW POST HAS BEEN CREATED BY ${original_id}`)
    }

    findUserSocketId = (custom_id) => {
        let indexofUserObj = null;
        const USEROBJ = this.users.filter((item, index) => {
            if (item.custom_id === custom_id) {
                indexofUserObj = index
                return item
            }
            return null
        });
        if (USEROBJ[0]) {
            return {
                original_id: USEROBJ[0].original_id,
                indexOfUser: indexofUserObj
            };
        } else {
            return {
                original_id: null,
                indexOfUser: null
            }
        }
    }

    GetUidFromSocketID = (id) => {
        return Object.keys(this.users).find((uid) => this.users[uid] === id);
    };

    SendMessage = (name, users, payload) => {
        console.info('Emitting event: ' + name + ' to', users);
        users.forEach((id) => (payload ? this.io.to(id).emit(name, payload) : this.io.to(id).emit(name)));
    };
}

module.exports = { ServerSocket }