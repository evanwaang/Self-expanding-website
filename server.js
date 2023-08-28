const express = require('express');
const { fetchBlogContent, fetchBlogById } = require('./scripts/fetchBlog.js');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/blogs', async (req, res) => {
    try {
        const blogs = await fetchBlogContent();
        res.render('blogs', { blogs: blogs });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/blog/:id', async (req, res) => {
    const blogId = req.params.id;
    try {
        const blog = await fetchBlogById(blogId);
        res.render('blog', { blog: blog });
    } catch (error) {
        console.error(`Error fetching blog with ID ${blogId}:`, error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(PORT, () => {

});
