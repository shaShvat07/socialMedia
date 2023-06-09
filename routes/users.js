const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/userController');

router.get('/profile/:id', passport.checkAuthentication, userController.profile);
router.post('/update/:id', passport.checkAuthentication, userController.update);
router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);
router.post('/create' , userController.create); //method should be same i.e. post used

//Using passport as a middleware to authenticate the users. 
router.post('/create-sessions' ,
 passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
 )
, userController.createSession);

router.get('/sign-out' , userController.destroySession);


router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback' , passport.authenticate('google', {failureRedirect: '/users/sign-in'}), userController.createSession);

module.exports = router;
