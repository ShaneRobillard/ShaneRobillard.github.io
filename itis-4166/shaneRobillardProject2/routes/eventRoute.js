const express = require('express');
const controller = require('../controllers/eventController');
const router = express.Router();

router.get('/edit', controller.edit);

router.get('/event', controller.event);

router.get('/events', controller.events);

router.get('/newEvent', controller.newEvent);

router.post('/', controller.create);

router.put('/', controller.update);

router.delete('/', controller.delete);

module.exports = router;