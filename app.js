import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';
import configRoutes from './routes/index.js';
import {
    fileURLToPath
} from 'url';
import {
    dirname
} from 'path';
import exphbs from 'express-handlebars';
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);
// const { getMostRecentTransactionsByUserId } = require('./data/transactions.js');

const staticDir = express.static(__dirname + '/public');

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    // If the user posts to the server with a property called _method, rewrite the request's method 
    // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
    // rewritten in this middleware to a PUT route
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }

    // let the next middleware run:
    next();
};

app.use('/public', staticDir);
app.use(express.json());

app.use(session({
    name: 'AuthCookie',
    secret: "This is a secret.. shhh don't tell anyone",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000
    }
}));
app.use(express.urlencoded({
    extended: true
}));
app.use(rewriteUnsupportedBrowserMethods);

app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(cookieParser());

let requests = 0;
app.use(async (req, res, next) => {
    let currentTime = new Date().toUTCString();
    let method = req.method;
    let route = req.originalUrl;
    let authenticated = undefined;

    if (req.session.user) authenticated = true;
    else authenticated = false;
    console.log(`Time: ${currentTime}, Method: ${method}, Route: ${route}, 
    userAuth Status: ${authenticated}`);
    next();
})

app.use(async (req, res, next) => {
    requests++;
    next();
})

const pathsAccessed = {};

app.use(async (req, res, next) => {
    if (!pathsAccessed[req.path]) pathsAccessed[req.path] = 0;
    pathsAccessed[req.path]++;
    next();
})

app.use(async (req, res, next) => {
    if (requests % 2 == 0) {
        req.isEven = true;
    } else {
        req.odd = true;
    }
    next();
})

app.get('/register', (req, res, next) => {
    //TODO
    next();
});
app.get('/login', (req, res, next) => {
    //TODO
    next();
})

app.get('/logInError', (req, res, next) => {
    //TODO
    next();
})

app.get('/logInError', (req, res, next) => {
    //TODO
})

app.get('/logout', (req, res, next) => {
    //TODO
})

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});
