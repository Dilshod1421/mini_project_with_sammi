const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.get('/', (req, res) => {
    res.render('index', {});
});

app.get('/about', (req, res) => {
    res.render('about', {});
});

const port = process.env.PORT || 1212;
app.listen(port, () => console.log(`Server listening on ${port}`));