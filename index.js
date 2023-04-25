const { urlencoded } = require('express');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const port = 8090;
const passport = require('passport');
var mongoose = require('mongoose');
const app = express();
// const db = require('./config/mongoose');
mongoose.connect("mongodb+srv://jasminkoladiya:jasminkoladiya098@cluster0.bamfqbm.mongodb.net/MovieProject" , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB connected!...");
}).catch(err => {
    console.log("Error connecting to DB:", err);
});
const passportLocal = require('./config/passport_local_strategy');
const passportLocalUser = require('./config/passport_local_strategy_user');
app.use(express.static('assets'));
const session = require('express-session');
app.use(session({
    name : "jasmin",
    secret : "node",
    resave : true,
    saveUninitialized : false,
    Cookie :{
        maxAge : 100*60*100000
    }
}))
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(urlencoded()); 
app.use('/', require('./routes/admin'));
app.use('/user', require('./routes/user')),
app.use('/moviemall', require('./routes/moviemall')),
app.use('/movie',require('./routes/movie'))
app.use('/mall',require('./routes/mall'))
app.use('/movieshow',require('./routes/movieshow'))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/uploads', express.static(path.join(__dirname,'uploads')));
app.listen(port, function(err){
    if(err)
    {
        console.log(err);
        return false;
    }
    console.log("Server is running on port = " +port);
});