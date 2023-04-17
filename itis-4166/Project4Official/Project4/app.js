// require modules
const express = require('express');//
const session = require('express-session');//
const morgan = require('morgan');//
const flash = require('connect-flash'); //
const mainRoutes = require("./routes/mainRoutes");//
const eventRoutes = require("./routes/eventsRoutes");//
const userRoutes = require('./routes/userRoutes');//
const methodOverride = require('method-override'); //
const { fileUpload } = require('./middleware/fileUpload');//
const mongoose = require('mongoose');//
const MongoStore = require('connect-mongo');

// create app
const app = express();

// configure app
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

// create session cookie
app.use(session({
    secret: 'apodkmmq-21opJQfweSDF23edsdad',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongoUrl: 'mongodb://0.0.0.0/demos'}),
    cookie: { maxAge: 60*60*1000 }
}));

app.use(flash());

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


app.use((req, res, next) => {
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    
    if(req.session) {
        res.locals.user = req.session.user;
        res.locals.name = req.session.name;
      }
    next();
  });

app.use('/', mainRoutes);
app.use('/events', eventRoutes);
app.use('/event', eventRoutes);
app.use('/user', userRoutes);


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