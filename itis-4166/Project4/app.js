// require modules
const express = require('express');//
const session = require('express-session');//
const morgan = require('morgan');//
const mainRoutes = require("./routes/mainRoutes");//
const flash = require('connect-flash'); //
const eventRoutes = require("./routes/eventsRoutes");//
const userRoutes = require('./routes/userRoutes');//
const methodOverride = require('method-override'); //
const { fileUpload } = require('./middleware/fileUpload');//
const mongoose = require('mongoose');//
const MongoDBStore = require('connect-mongodb-session')(session);

// create app
const app = express();

// configure app
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

/* Mongoose.set('strictQuery', false);
Mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, host, () => {
            console.log('Server is running on port', port);
        });
    })
    .catch(err => console.log(err.message)); */

app.use(flash());

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.successMessages = req.flash('success');
    res.locals.errorMessages = req.flash('error');
    next();
});

//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(methodOverride('_method')); // May not need this line

app.post('/', fileUpload, (req, res, next) => {
    let image = "./images/" + req.file.filename;
    res.render('/events', { image });
});

mongoose.connect("mongodb+srv://JosephMinton:demo123@cluster0.03dpqax.mongodb.net/nbda-project3?retryWrites=true&w=majority")
    .then(() => {
        app.listen(port, host, () => {
            console.log('Server is running on port', port);
        });
    })
    .catch(err => console.log(err.message));

/*set up routes
app.get('/', (req, res)=>{
    res.render('index');
});*/

app.use('/', mainRoutes);
app.use('/events', eventRoutes);
app.use('/event', eventRoutes);
app.use('/users', userRoutes);

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

/* //start the server
app.listen(port, host, () => {
    console.log('Server is running on port', port);
}) */

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
    const startDateTime = new Date(req.body.start);
    const endDateTime = new Date(req.body.end);
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

const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/your-db-name',
  collection: 'sessions'
});

store.on('error', function(error) {
  console.log(error);
});

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: store
}));