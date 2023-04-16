const express = require('express');
const controller = require('../controllers/eventsController');
const { route } = require('./mainRoutes');
const router = express.Router();
const { fileUpload } = require('../middleware/fileUpload');
const auth = require('./middlewares/auth');

router.get('/', controller.events)

router.get('/newEvent', controller.newEvent);

router.get('/:id', controller.show);

router.get('/:id/edit', controller.edit);

router.post('/', fileUpload, controller.create);

router.put('/:id', fileUpload, controller.update);

router.delete('/:id', controller.delete);

// anyone can view these pages
router.get('/', (req, res) => { /* ... */ });
router.get('/contact', (req, res) => { /* ... */ });
router.get('/about', (req, res) => { /* ... */ });
router.get('/events', (req, res) => { /* ... */ });
router.get('/events/:id', (req, res) => { /* ... */ });

// only guests can view these pages
router.get('/new', (req, res) => { /* ... */ });
router.post('/new', (req, res) => { /* ... */ });
router.get('/login', (req, res) => { /* ... */ });
router.post('/login', (req, res) => { /* ... */ });

// only authenticated users can view these pages
router.get('/events/newEvent', auth.isAuthenticated, (req, res) => { /* ... */ });
router.post('/events/newEvent', auth.isAuthenticated, (req, res) => { /* ... */ });
router.get('/logout', auth.isAuthenticated, (req, res) => { /* ... */ });

// only the host of an event can view/edit/delete it
router.get('/events/edit/:id', auth.isAuthenticated, (req, res, next) => {
  Event.findById(req.params.id, (err, event) => {
    if (err) return next(err);
    if (!event) return res.status(404).send('Event not found');
    if (event.createdBy !== req.session.user._id) return res.status(401).send('Unauthorized');
    res.render('editEvent', { event });
  });
});

router.post('/events/edit/:id', auth.isAuthenticated, (req, res, next) => {
  Event.findById(req.params.id, (err, event) => {
    if (err) return next(err);
    if (!event) return res.status(404).send('Event not found');
    if (event.createdBy !== req.session.user._id) return res.status(401).send('Unauthorized');

    // update the event
    event.title = req.body.title;
    event.description = req.body.description;
    // ...

    event.save()
      .then(() => res.redirect('/events/' + event._id))
      .catch(next);
  });
});

router.get('/events/delete/:id', auth.isAuthenticated, (req, res, next) => {
  Event.findById(req.params.id, (err, event) => {
    if (err) return next(err);
    if (!event) return res.status(404).send('Event not found');
    if (event.createdBy !== req.session.user._id) return res.status(401).send('Unauthorized');

    event.remove()
      .then(() => res.redirect('/events'))
      .catch(next);
  });
});

module.exports = router;