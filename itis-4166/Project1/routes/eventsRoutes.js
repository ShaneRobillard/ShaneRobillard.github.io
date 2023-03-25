const express = require('express');
const controller = require('../controllers/eventsController');
const {route} =require('./mainRoutes');
const router = express.Router();
const { fileUpload } = require('../middleware/fileUpload')

router.get('/', controller.events)

router.get('/newEvent', controller.newEvent);

router.get('/:id', controller.show);

router.get('/:id/edit', controller.edit);

router.post('/', fileUpload, controller.create);

router.put('/:id', fileUpload, controller.update);

router.delete('/:id', controller.delete);

module.exports = router;

/* // GET /events
router.get('/', controller.events);

//GET /events/newEvent
router.get('/newEvent', controller.newEvent);

//POST /events
router.post('/', controller.create);

//GET /events/:id:
router.get('/:id', controller.event);

//GET /events/:id/edit:
router.get('/:id/edit', controller.edit);

//PUT /stories/:id:
router.put('/:id', controller.update);

//DELETE /events/:id:
router.delete('/:id', controller.delete);

module.exports = router; */