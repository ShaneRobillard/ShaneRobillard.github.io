const express = require('express');
const controller = require('../controllers/eventController');
const router = express.Router();

router.get('/edit', controller.edit);

router.get('/:id', controller.show);

router.get('/newEvent', controller.newEvent);

router.post('/', controller.create);

router.put('/:id', controller.update);

router.delete('/:id', controller.delete);

module.exports = router;