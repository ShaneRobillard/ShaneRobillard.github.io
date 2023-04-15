//require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mainRoute = require('./routes/mainRoute');
const eventRoute = require('./routes/eventRoute');
const userRoute = require('./routes/userRoute')
const {fileUpload} = require('./middleware/fileUpload');
const mongoose = require('mongoose');

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