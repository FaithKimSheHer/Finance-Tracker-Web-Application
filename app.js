import express from 'express';
const app = express();

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import exphbs from 'express-handlebars';

import session from 'express-session';

import configRoutes from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticDir = express.static(__dirname + '/public');
app.use('/public', staticDir);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

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
app.use(rewriteUnsupportedBrowserMethods);

// middleware -------------------------------------- v
app.use(session({
    name: "AuthCookie",
    secret: "Patrick Hill",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 30000}
}));

app.use('/', async(req, res, next) => {
    if(req.path === '/error' || req.path === '/logout') return next();
    if(req.session.user) {
        console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} (Authenticated User)`);
        // return res.redirect('/dashboard');
        next();
        //would handle and render a 500 here but errorpage was made only for unauthorized admin route...
    }
    console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} (Non-Authenticated User)`);
    if (req.path === '/users/login' || req.path === '/users/register') return next();
    return res.redirect('/users/login');
});

app.use('/logout', async (req, res, next) => {
    if(!req.session.user) {
        console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} (Non-Authenticated User)`);
        return res.status(200).redirect('/login');
    }
    console.log(`[${new Date().toUTCString()}]: ${req.method} ${req.originalUrl} (Authenticated User)`);
    next();
});
// middleware -------------------------------------- ^

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});
