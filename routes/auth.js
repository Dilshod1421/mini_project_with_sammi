import { Router } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { generateJWT } from '../services/token.js';

const router = Router();

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});

router.get('/login', authMiddleware, (req, res) => {
    res.render('login', {
        title: 'AbuDev | Login',
        isLogin: true,
        loginError: req.flash('loginError')
    });
});

router.get('/register', authMiddleware, (req, res) => {
    res.render('register', {
        title: 'AbuDev | Register',
        isRegister: true,
        registerError: req.flash('registerError')
    });
});

router.post('/login', async (req, res) => {

    let { email, password } = req.body;
    if (!email || !password) {
        req.flash('loginError', 'All fields are required!');
        res.redirect('/login');
        return;
    };
    const existUser = await User.findOne({ email });
    if (!existUser) {
        req.flash('loginError', 'User not found!')
        res.redirect('/login');
        return;
    };
    const isPswEqual = await bcrypt.compare(password, existUser.password);
    if (!isPswEqual) {
        req.flash('loginError', 'Password wrong!');
        res.redirect('/login');
        return;
    };
    const token = generateJWT(existUser._id);
    res.cookie('token', token, { httpOnly: true, secure: true });
    res.redirect('/');
});

router.post('/register', async (req, res) => {
    let { firstname, lastname, email, password } = req.body;
    if (!email || !password || !email || !password) {
        req.flash('registerError', 'All fields are required');
        res.redirect('/register');
        return;
    };
    const candidate = await User.findOne({ email });
    if (candidate) {
        req.flash('registerError', 'User already exists');
        res.redirect('/register');
        return;
    };
    const hashedPsw = await bcrypt.hash(password, 10)
    const userData = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashedPsw
    };
    const user = await User.create(userData);
    const token = generateJWT(user._id);
    res.cookie('token', token, { httpOnly: true, secure: true });
    res.redirect('/login');
});

export default router;