import express from 'express';
const router = express.Router();
import {
    transactFuns
} from "../data/index.js";

//rendering partials: https://waelyasmina.medium.com/a-guide-into-using-handlebars-with-your-express-js-application-22b944443b65
//we want transaction summary, calculations, dashboard to be on home (landing) page.

<<<<<<< Updated upstream
router
    .route('/')
    .get(async (req, res) => {
        const user = req.session.user;
        res.status(200).render('dashboard', {user: user});
    });
=======
// router
//     .route('/')
//     .get(async (req, res) => {
//         const user = req.session.user;
//         res.status(200).render('dashboard', {user: user});
//     });
>>>>>>> Stashed changes

// export default router;

router.route("/").get(async (req, res) => {
    const data = await transactFuns.getMostRecentTransactionsByUserEmail(req.session.user.email);
    res.status(200).render("dashboard", {
        user: req.session.user,
        layout: "main",
        title: "Dashboard",
        include: "partials/update",
        summary: data
    });
});

export default router;