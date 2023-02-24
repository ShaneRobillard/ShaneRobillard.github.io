const express = require('express');
const controller = require('../controllers/eventController');
const router = express.Router();

router.use(function(err, req, res, next) {
    console.log('Error Handler');
    res.status(err.status || 500);
    res.render('Error: ',{error:err,message:err.message,url:req.url});
  });

router.get('/:id/edit', controller.edit);

router.get('/:id', controller.show);

router.get('/:id', controller.newEvent);

router.post('/', controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.delete);

module.exports = router;