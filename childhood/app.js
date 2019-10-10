const express=require('express');
const bodyParser=require('body-parser');
const session=require('express-session');
const mongoose=require('mongoose');
const passport=require('passport');
const flash=require('connect-flash');
const cookieParser=require('cookie-parser');

const app=express();

require('./config/passport')(passport);

const db = require('./config/keys').MongoURI;

const con=mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('connected')).catch(err => console.log(err));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUnitionalized: true, 
}));


app.set('view engine', 'pug');
app.set('views', './views');

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    next();
});

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use(express.static('./images'));
app.use('/others', express.static('./others'));

const port=process.env.port || 8000;

app.listen(port, console.log(__dirname));