const express = require('express');
const connectDB = require('./db'); // Import the database connection function
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongodb
connectDB();

// listen for requests
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

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
