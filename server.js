const express = require('express');
const { fetchBlogContent } = require('./scripts/fetchBlog.js');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try {
        const blogs = await fetchBlogContent();
        // render the blogs using a template engine or send them as JSON for now
        res.render('index', { blogs: blogs });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).send('Internal Server Error');
    }
});



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
