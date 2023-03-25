const express = require('express');
const tradeController = require('../controllers/tradeController')
const router = express.Router();

router.use(function(err, req, res, next) {
  console.log('Error Handler');
  res.status(err.status || 500);
  res.render('Error: ',{error:err,message:err.message,url:req.url});
});

router.get('/', tradeController.trades);
router.get('/new', tradeController.new);
router.get('/:id', tradeController.show);
router.get('/:id/edit', tradeController.edit);
router.post('/', tradeController.create);
router.put('/:id', tradeController.update);
router.delete('/:id', tradeController.delete);

module.exports = router;