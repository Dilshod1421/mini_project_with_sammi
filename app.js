import express from 'express';
import mongoose from 'mongoose';
import flash from 'connect-flash';
import session from 'express-session';
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

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: 'AbuDev', resave: false, saveUninitialized: false }));
app.use(flash());

app.use(AuthRoutes);
app.use(ProductsRoutes);

const startApp = () => {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, console.log("Mongo DB connected"));

        const port = process.env.PORT || 1212;
        app.listen(port, () => console.log(`Server listening on ${port}`));
    }
    catch (err) {
        console.log(err);
    }
};

startApp();