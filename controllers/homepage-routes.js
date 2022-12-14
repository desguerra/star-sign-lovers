const router = require('express').Router();
const sequelize = require('../config/connection');
const { Profile } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);

    Profile.findAll()
        .then((dbProfileData) => {
            const profiles = dbProfileData.map((profile) => profile.get({ plain: true }));

            res.render('homepage', {
                profiles,
                loggedIn: req.session.loggedIn,
                user_id: req.session.user_id,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

module.exports = router;