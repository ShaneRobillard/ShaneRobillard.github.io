//require modules
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');

//create application
const app = express();

//configure application
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

//start the server
app.listen(port, host, ()=>{
    console.log('Server is running on port', port);
})