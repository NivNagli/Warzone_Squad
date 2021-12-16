/******************************************************************************************************************
 * This route is responsible for retrieving concrete information about a specific player and storing it in a database,
 * in case we have an existing data about the player in the database we will return it.
 * We will extract the user information with the 'extractFromActivision' Route.
 * 
 * The way it will be implemented appears in the 'match.js' file inside 'controllers' folder.
****************************************************************************************************************** */

const express = require('express');

const router = express.Router();

const profileController = require('../controllers/profile');

router.get('/username/:username/platform/:platform', profileController.getUser);

module.exports = router;