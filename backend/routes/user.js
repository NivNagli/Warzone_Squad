const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/user');

router.post(
    '/signup',

    [
        check('email')
        .normalizeEmail()
        .isEmail(),

        check('password')
        .isLength({min : 5}),

        check('username')
        .not()
        .isEmpty(),

        check('platform')
        .not()
        .isEmpty(),
    ],

    userController.signup
);

module.exports = router;