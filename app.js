const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')

// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://ermal:ermal1234@cluster0.nj4ewzl.mongodb.net/'
mongoose.connect(dbURI)
    .then((result) => app.listen(3003))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// routes
app.get('/', (req, res) => {
   res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes); 

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page not found!' });
});