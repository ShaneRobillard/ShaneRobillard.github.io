const express = require('express');
const controller = require('../controllers/eventController');
const { route } = require('./mainRoute');
const router = express.Router();
const {fileUpload} = require('../middleware/fileUpload');
const {isAuthor, isLoggedIn} = require('../middleware/auth');
const {validateId} =  require('../middleware/validator');

router.use(function(err, req, res, next) {
    console.log('Error Handler');
    res.status(err.status || 500);
    res.render('Error: ',{error:err,message:err.message,url:req.url});
  });

router.get('/', controller.events)

router.get('/newEvent', isLoggedIn, controller.newEvent);

router.get('/:id', validateId, controller.show);

router.get('/:id/edit', isLoggedIn, isAuthor, validateId, controller.edit);

router.post('/', fileUpload, isLoggedIn, controller.create);

router.put('/:id', fileUpload, isLoggedIn, isAuthor, validateId, controller.update);

router.delete('/:id', isLoggedIn, isAuthor, validateId, controller.delete);

module.exports = router;