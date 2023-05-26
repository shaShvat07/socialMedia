const express = require('express');
const env = require('./config/environment');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db  = require('./config/mongoose');
//Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
// Set up the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
var cors = require('cors');
// const corsOptions = {
//     origin: "*",
//     optionsSuccessStatus: 200
//   };

chatServer.listen(5000);
console.log('Chat server is running on port: 5000');


app.use(
    sassMiddleware({
    src: path.join(__dirname, env.asset_path ,'scss'),
    dest: path.join(__dirname, env.asset_path ,'css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css',
})
);

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static(env.asset_path));

//Make the upload path availabe to the browser
app.use('/uploads' , express.static(__dirname + '/uploads'));

app.use(expressLayouts);
//extract styles and scripts from the subpages into the layout
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);

//setting up the view engine
app.set('view engine' , 'ejs');
app.set('views', './views');

//mongo store is to store the session cookie in the db
app.use(session({
    name: 'codieal',
    secret: env.session_cookie_key,
    saveUninitialized:  false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
            mongooseConnection: db,
            autoRemove: 'disabled'
    },
    function(err){
        console.log( err || 'connect-mongodb setup ok!');
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

//use express router

// app.use(cors(corsOptions));
app.use('/' , require('./routes'));
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server ${err}`);
    }

    console.log(`The server is running on port : ${port}`);
})