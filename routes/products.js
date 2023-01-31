import { Router } from 'express';
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

export default router;