import { Router } from 'express';
import Product from '../models/Product.js';
import productMiddleware from '../middleware/productMiddleware.js';
import userMiddleware from '../middleware/userMiddleware.js';
const router = Router();

router.get('/', async (req, res) => {
    const products = await Product.find().lean();
    res.render('index', {
        title: 'AbuDev | Shop',
        products: products.reverse(),
        userId: req.userId ? req.userId.toString() : null
    });
});

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

router.get('/product/:id', async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id).populate('user').lean();
    res.render('detailProduct', {
        title: 'AbuDev | Product details',
        product: product
    });
})

router.get('/editProduct/:id', async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id).populate('user').lean();
    res.render('editProduct', {
        title: 'AbuDev | Edit product',
        product: product,
        editProductError: req.flash('editProductError')
    });
});

router.post('/edit-product/:id', async (req, res) => {
    const { title, description, image, price } = req.body;
    const id = req.params.id;
    if (!title || !description || !image || !price) {
        req.flash('editProductError', 'All fields are required');
        res.redirect(`/editProduct/${id}`);
        return;
    };
    await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.redirect('/products');
})

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