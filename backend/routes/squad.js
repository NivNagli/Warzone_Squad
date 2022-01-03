const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const squadController = require('../controllers/squad');

router.get(
    '/test',

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

module.exports = router;