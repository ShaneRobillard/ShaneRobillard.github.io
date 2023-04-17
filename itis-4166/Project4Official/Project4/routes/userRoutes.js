const express = require('express');
const userController = require('../controllers/userController');
const { isGuest, isLoggedIn } = require('../middleware/auth');

const router = express.Router();

router.use(function(err, req, res, next) {
    console.log('Error Handler');
    res.status(err.status || 500);
    res.render('Error: ',{error:err,message:err.message,url:req.url});
});

//Routing for signup page
router.get('/new', isGuest, userController.new);

//Routing for login
router.get('/login', isGuest, userController.userLogin);

//Routing for profile page
router.get('/profile', isLoggedIn, userController.profile);

//Handles logging out
router.get('/logout', isLoggedIn, userController.logout);

//Routing for POST to handle login
router.post('/login', isGuest, userController.login);

router.post('/', isGuest, userController.create);

module.exports = router;