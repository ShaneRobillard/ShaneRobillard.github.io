const express = require('express');
const userController = require('../controllers/userController');
const {isGuest, isLoggedIn} = require('../middlewares/validator');
const router = express.Router();

router.use(function(err, req, res, next) {
    console.log('Error Handler');
    res.status(err.status || 500);
    res.render('Error: ',{error:err,message:err.message,url:req.url});
});

router.get('/newUser', isGuest, userController.newUser);
router.get('/login', isGuest, userController.getUserLogin);
router.get('/profile', isLoggedIn, userController.profile);
router.get('/logout', isLoggedIn, userController.logout);
router.post('/login', isGuest, userController.login);
router.post('/', isGuest, userController.create);

module.exports = router;