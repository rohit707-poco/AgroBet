const express = require('express');
const session = require('express-session')
const con = require('./db-config');
const path = require('path');
const routes = require('./routes/routes')
const bodyParser = require('body-parser')
const app = express();


app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
   
app.use(session({
    secret: "This is session secret",
    saveUninitialized: true,
    resave: true
}));

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.use((req, res, next) => {
    res.locals.isAuth = req.session.isAuth;
    next();
});






app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes)

app.listen(5500, () => {
    console.log("Server listening to http://localhost:5500");
})

