// require modules
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const ejs = require('ejs');
const mainRoutes = require("./routes/mainRoutes");
const eventRoutes = require("./routes/eventsRoutes");
const userRoutes = require('./routes/userRoutes');
const methodOverride = require('method-override');
const { fileUpload } = require('./middleware/fileUpload');

// create app
const app = express();

// configure app
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');


//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

/*set up routes
app.get('/', (req, res)=>{
    res.render('index');
});*/

/* app.post('/', fileUpload, (req, res, next) => {
    let image =  "./images/" + req.file.filename;
    res.render('/events', {image});
}); */

app.use('/', mainRoutes);
app.use('/events', eventRoutes);
app.use('/event', eventRoutes);
app.use('/users', userRoutes);

// set up 404 status error
app.use((req, res, next) => {
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

// set up Internal Server Error
app.use((err, req, res, next) => {
    console.log(err.stack);
    if (!err.status) {
        err.status = 500;
        err.message = ("Internal Server Error");
    }
    res.status(err.status);
    res.render('./events/error', { error: err });
});

//start the server
app.listen(port, host, () => {
    console.log('Server is running on port', port);
})

/* app.get('NewEvent', (req, res) => {
    res.render('newEvent.ejs');
}); */

/* // May use this code later on to create edit form.
app.put('/events/:id', (req, res) => {
    updateEventById(req.params.id, req.body);
    res.redirect('/events');
}); */

/* app.get('/events/:id/edit', (req, res) => {
    const event = getEventById(req.params.id);
    res.render('edit', { event });
});

app.post('/newEvent', (req, res) => {
    const title = req.body.title;
    const host = req.body.host;
    const details = req.body.details;
    const location = req.body.location;
    const startDateTime = new Date(req.body.startDateTime);
    const endDateTime = new Date(req.body.endDateTime);
    const image = req.file.filename;

    res.redirect('/events');
}); */

// create session cookie
app.use(session({
    secret: 'apodkmmq-21opJQfweSDF23edsdad',
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    cookie: { maxAge: 86400 }
}));