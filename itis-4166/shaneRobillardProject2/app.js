//require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mainRoute = require('./routes/mainRoute');
const eventRoute = require('./routes/eventRoute');
const {fileUpload} = require('./middleware/fileUpload');

//create application
const app = express();

//configure application
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

//mount middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

/*set up routes
app.get('/', (req, res)=>{
    res.render('index');
});*/

app.post('/', fileUpload, (req, res, next) => {
    let image =  "./images/" + req.file.filename;
    res.render('/event', {img});
});

app.use('/', mainRoute);
app.use('/events', eventRoute);
app.use('/event', eventRoute);

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

//start the server
app.listen(port, host, ()=>{
    console.log('Server is running on port', port);
})