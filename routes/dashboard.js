import express from 'express';
const router = express.Router();

//rendering partials: https://waelyasmina.medium.com/a-guide-into-using-handlebars-with-your-express-js-application-22b944443b65
//we want transaction summary, calculations, dashboard to be on home (landing) page.

router
    .route('/')
    .get(async (req, res) => {
        const user = req.session.user;
        res.render('dashboard', { title: 'Dashboard', user: user});
    });

export default router;
