const express = require('express');
const controller = require('../controllers/mainController');
const router = express.Router();

router.use(function(err, req, res, next) {
    console.log('Error Handler');
    res.status(err.status || 500);
    res.render('Error: ',{error:err,message:err.message,url:req.url});
  });
  
router.get('/', controller.index);

router.get('/contact', controller.contact);

router.get('/about', controller.about);

module.exports = router;