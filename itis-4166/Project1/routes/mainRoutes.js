/* const express = require('express');
const mainController = require('../controllers/mainController');
const mainRouter = express.Router();

mainRouter.use(function (err, req, res, next) {
    console.log('Error Handler');
    res.status(err.status || 500);
    res.render('Error: ', { error: err, message: err.message, url: req.url });
});

//GET home page
mainRouter.get('/', mainController.index);

//GET about page
mainRouter.get('/about', mainController.about);

//DGET contact page
mainRouter.get('/contact', mainController.contact);

module.exports = mainRouter; */

const express = require('express');
const controller = require('../controllers/mainController');
const router = express.Router();
  
router.get('/', controller.index);

router.get('/contact', controller.contact);

router.get('/about', controller.about);

module.exports = router;