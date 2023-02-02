import { Router } from 'express';
import Product from '../models/Product.js';
import productMiddleware from '../middleware/productMiddleware.js';
import userMiddleware from '../middleware/userMiddleware.js';
const router = Router();

router.get('/add', productMiddleware, (req, res) => {
    res.render('add', {
        title: 'AbuDev | Add',
        isAdd: true,
        addProductsError: req.flash('addProductsError')
    });
});

router.get('/products', async (req, res) => {
    const user = req.userId ? req.userId.toString() : null;
    const myProducts = await Product.find({ user }).populate('user').lean();
    res.render('products', {
        title: 'AbuDev | Products',
        isProducts: true,
        myProducts: myProducts
    });
});

router.post('/add-products', userMiddleware, async (req, res) => {
    const { title, description, image, price } = req.body;
    if (!title || !description || !image || !price) {
        req.flash('addProductsError', 'All fields are required');
        res.redirect('/add');
        return;
    };
    const product = await Product.create({ ...req.body, user: req.userId });
    res.redirect('/');
});

export default router;