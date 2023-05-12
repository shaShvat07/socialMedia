const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/profile', userController.profile);
router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);

router.post('/create' , userController.create); //method should be same i.e. post used

module.exports = router;
