import { Router } from 'express';
import bcrypt from 'bcrypt';
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

router.post('/login', async (req, res) => {
    const existUser = await User.findOne({ email: req.body.email });
    if (!existUser) { console.log('User not found'); return }
    const isPswEqual = await bcrypt.compare(req.body.password, existUser.password);
    if (!isPswEqual) { console.log('Password wrong'); return }
    res.redirect('/');
});

router.post('/register', async (req, res) => {
    const hashedPsw = await bcrypt.hash(req.body.password, 10)
    const userData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPsw
    };
    const user = await User.create(userData);
    res.redirect('/login');
});

export default router;