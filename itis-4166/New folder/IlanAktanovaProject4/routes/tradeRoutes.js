const express = require('express');
const tradeController = require('../controllers/tradeController')
const {isLoggedIn, isAuthor} = require('../middlewares/validator');
const router = express.Router();

router.use(function(err, req, res, next) {
  console.log('Error Handler');
  res.status(err.status || 500);
  res.render('Error: ',{error:err,message:err.message,url:req.url});
});

router.get('/', tradeController.trades);
router.get('/new', isLoggedIn, tradeController.new);
router.get('/:id', tradeController.show);
router.get('/:id/edit', isLoggedIn, isAuthor, tradeController.edit);
router.post('/', isLoggedIn, tradeController.create);
router.put('/:id', isLoggedIn, isAuthor, tradeController.update);
router.delete('/:id', isLoggedIn, isAuthor, tradeController.delete);

module.exports = router;