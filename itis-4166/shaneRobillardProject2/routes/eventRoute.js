const express = require('express');
const controller = require('../controllers/eventController');
const { route } = require('./mainRoute');
const router = express.Router();
const {fileUpload} = require('../middleware/fileUpload')

router.get('/', controller.events)

router.get('/newEvent', controller.newEvent);

router.get('/:id', controller.show);

router.get('/:id/edit', controller.edit);

router.post('/', fileUpload, controller.create);

router.put('/:id', fileUpload, controller.update);

router.delete('/:id', controller.delete);

module.exports = router;