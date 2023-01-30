import { Router } from 'express';
const router = Router();

router.get('/add', (req, res) => {
    res.render('add', {
        title: 'Add | AbuDev',
        isAdd: true
    });
});

router.get('/products', (req, res) => {
    res.render('products', {
        title: 'Products | AbuDev',
        isProducts: true
    });
});

export default router;