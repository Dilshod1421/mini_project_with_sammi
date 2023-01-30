import express from 'express';
import { create } from 'express-handlebars';
import AuthRoutes from './routes/auth.js';
import ProductsRoutes from './routes/products.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const hbs = create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(AuthRoutes);
app.use(ProductsRoutes);

const port = process.env.PORT || 1212;
app.listen(port, () => console.log(`Server listening on ${port}`));