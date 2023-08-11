import express from 'express';
const app = express(); 
import cookieParser from 'cookie-parser';
import session from 'express-session';
import configRoutes from './routes/index.js';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import exphbs from 'express-handlebars';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { getMostRecentTransactionsByUserId } = require('./data/transactions.js');

const staticDir = express.static(__dirname + '/public');

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    // If the user posts to the server with a property called _method, rewrite the request's method 
    // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
    // rewritten in this middleware to a PUT route
    if(req.body && req.body._method) {
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
    cookie: {maxAge: 60000} 
})); 

app.use('/', (req, res, next) => { 
    let authentification = "(Non-Authenticated User)";
    if(req.session.user) authentification = "(Authenticated User)"; 
    
    let currentTimestamp = new Date().toString(); 
    console.log([currentTimestamp], ":", req.method, req.originalUrl, [authentification]);
    console.log();  
    next();  
});

app.use('/register', (req, res, next) => {  
    if(req.session.user && req.session.user.role == 'admin')        return res.redirect('/admin'); 
    else if(req.session.user && req.session.user.role == 'user')    return res.redirect('/protected'); 
    next();
});

app.use(cookieParser());

app.use('/login', (req, res, next) => {  
    res.cookie('AuthCookie', req.session);
    console.log("AuthCookie: ", req.session);
    if(req.session.user && req.session.user.role == 'admin')        return res.redirect('/admin'); 
    else if(req.session.user && req.session.user.role == 'user')    return res.redirect('/protected'); 
    next(); 
});

app.use('/protected', (req, res, next) => { 
    if(!req.session.user)                  return res.redirect('/login'); 
    next();
});

app.use('/admin', (req, res, next) => { 
    if(!req.session.user)    return res.redirect('/login');
    else if(req.session.user && req.session.user.role != 'admin')   
        return res.status(403).render('error', {error: "user does not have permission to view the page"});  
  next();
}); 

app.use('/logout', (req, res, next) => { 
  if(!req.session.user)                  return res.redirect('/login');   
  next();
}); 

app.get('/api/getRecentTransactions', async (req, res) => {
  const userId = req.query.userId;

  try {
    const transactions = await getMostRecentTransactionsByUserId(userId);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching transactions.' });
  }
});

app.use(express.urlencoded({extended: true}));
app.use(rewriteUnsupportedBrowserMethods);

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});
