//require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mainRoute = require('./routes/mainRoute');
const eventRoute = require('./routes/eventRoute');
const userRoute = require('./routes/userRoute')
const {fileUpload} = require('./middleware/fileUpload');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

//create application
const app = express();

//configure application
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

//mount middleware
app.use(
    session({
        secret: "ajfeirf90aeu9eroejfoefj",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: 'mongodb://0.0.0.0/demos'}),
        cookie: {maxAge: 60*60*1000}
        })
);
app.use(flash());

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

app.post('/', fileUpload, (req, res, next) => {
    let image =  "./images/" + req.file.filename;
    res.render('/event', {img});
});

mongoose.connect("mongodb+srv://project3:project3@project3.mfqxboe.mongodb.net/nbda-project3?retryWrites=true&w=majority")
.then(()=>{
    app.listen(port, host, ()=>{
        console.log('Server is running on port', port);
    });
})
.catch(err=>console.log(err.message));

app.use((req, res, next) => {
    res.locals.user = req.session.user||null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    res.locals.author = req.session.user||null;
    next();
});

app.use('/', mainRoute);
app.use('/events', eventRoute);
app.use('/event', eventRoute);
app.use('/users', userRoute);

app.use((req, res, next)=>{
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next)=>{
    console.log(err.stack);
    if (!err.status){
        err.status = 500;
        err.message = ("Internal Server Error");
    }
    res.status(err.status);
    res.render('./story/error', {error: err});
});