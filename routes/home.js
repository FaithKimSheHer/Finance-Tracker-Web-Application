import express from 'express';
const router = express.Router();
import path from 'path';
import {
    homeFuncs
} from '../data/index.js';

//rendering partials: https://waelyasmina.medium.com/a-guide-into-using-handlebars-with-your-express-js-application-22b944443b65
//we want transaction summary, calculations, dashboard to be on home (landing) page.

router
    .route('/home')
    .get(async (req, res) => {
        //TODO: check if user is logged in using browser session data
        //if not, load a diff summary bar and other stuff on page.
        //put a register button in middle or smt

        //if logged in, load the data accordingly
        res.render('home', { title: 'Summary' });
    });

export default router;
