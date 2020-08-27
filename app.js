const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.static('public'));

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