const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.set('view engine', 'ejs');

const DB = 'mongodb://localhost/node_auth';

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(result => app.listen(3000, console.log(`listening on port 3000`)))
    .catch(err => console.log(err));

app.get('/', (req,res) => res.render('home'));
app.get('/smoothies', (req,res) => res.render('smoothies'));
app.use(authRoutes);

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/set-cookie', (req,res) => {
    res.cookie('newUser', false);
    res.cookie('isEmployee', true, {
        maxAge: 100 * 60 * 24,
        httpOnly: true
    });

    res.send('you got cookies');
});

app.get('/read-cookies', (req,res) => {
    const cookies = req.cookies;
    console.log(cookies.newUser);

    res.json(cookies);
})