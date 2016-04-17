var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer =require('multer');
var uuid=require('node-uuid');
var cookieParser=require('cookie-parser');
var session=require('express-session');
var passport=require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.use(cookieParser());
app.use(session({secret: 'swayam',
resave:true,
    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());

var mongoose=require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017/webdev2016';
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
var db = mongoose.connect(connectionString);
//require("./public/assignment/server/app.js")(app,uuid,db);
require("./public/projects/server/app.js")(app,db);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.use(express.static(__dirname + '/public'));
app.get('/hello', function(req, res){
    res.send('hello world');
});
app.listen(port, ipaddress);