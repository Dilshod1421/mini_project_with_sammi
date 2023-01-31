import { Router } from 'express';
import User from '../models/User.js';
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

router.post('/register', async (req, res) => {
    const userData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    };
    const user = await User.create(userData);
    res.redirect('/login');
});

export default router;