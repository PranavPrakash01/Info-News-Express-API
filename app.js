var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const multer = require('multer')

const dotenv = require("dotenv");
const mongoose = require("mongoose")
dotenv.config();
const cors=require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
  }
  

const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")

mongoose.connect(process.env.MONGO_URL,{ 
  useNewUrlParser: true,
  useUnifiedTopology: true, })
  .then(console.log("Connected to Mongodb"))
  .catch(err=>console.log(err));



var app = express();
app.use(cors(corsOptions))

app.use('/images', express.static(path.join(__dirname,'/images')))

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'images')
  },
  filename:(req,file,cb)=>{
     cb(null,req.body.name)
  }

})
const upload = multer({storage:storage});
app.post('/api/upload',upload.single('file'),(req,res)=>{
  console.log(req.body);
  res.status(200).json('File Uploaded')
})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
