const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const squadController = require('../controllers/squad');

router.post(
    '/create-squad',

    [
        check('usernames')
        .not()
        .isEmpty(),

        check('platforms')
        .not()
        .isEmpty()
    ],

    squadController.getSquad
);

router.post(
    '/compare',

    [
        check('usernames')
        .not()
        .isEmpty(),

        check('platforms')
        .not()
        .isEmpty()
    ],

    squadController.comparePlayers
);

module.exports = router;