import { Router } from 'express';
import Product from '../models/Product.js';
const router = Router();

router.get('/add', (req, res) => {
    res.render('add', {
        title: 'AbuDev | Add',
        isAdd: true
    });
});

router.get('/products', (req, res) => {
    res.render('products', {
        title: 'AbuDev | Products',
        isProducts: true
    });
});

router.post('/add-products', async (req, res) => {
    const { title, description, image, price } = req.body;
    const product = await Product.create(req.body);
    res.redirect('/');
});

export default router;