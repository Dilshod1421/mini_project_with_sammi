import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Shop | AbuDev'
    });
});

router.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login | AbuDev',
        isLogin: true
    });
});

router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register | AbuDev',
        isRegister: true
    });
});

router.post('/login', (req, res) => {
    res.redirect('/');
});

router.post('/register', (req, res) => {
    res.redirect('/login');
});

export default router;