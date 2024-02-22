const User = require('../user/model');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { getToken } = require('../../utils');

const register = async (req, res, next) => {
    try {
        const payload = req.body;
        let user = new User(payload);
        await user.save();
        return res.json(user);
    } catch (err) {
        //cek kemungkinan kesalahan terkait validasi
        if (err && err.name === 'ValidationError') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors,
            });
        }
        next(err);
    }
};

const localStrategy = async (email, password, done) => {
    try {
        let user = await User.findOne({ email }).select('-__v -createdAt -updatedAt -cart_items -token');
        if (!user) return done();
        if (bcrypt.compareSync(password, user.password)) {
            const userWithoutPassword = user.toJSON();
            delete userWithoutPassword.password; // Menghapus properti 'password' dari userWithoutPassword
            return done(null, userWithoutPassword);
        } else {
            return done(); // Memanggil done() ketika kata sandi tidak cocok
        }
    } catch (err) {
        done(err, null);
    }
};

const login = (req, res, next) => {
    passport.authenticate('local', function (err, user) {
        if (err) return next(err);

        if (!user) return res.json({ error: 1, message: 'email or password incorrect' });

        let signed = jwt.sign(user, config.secretkey);

        User.findByIdAndUpdate(user._id, { $push: { token: signed } })
            .then(() => {
                res.json({
                    message: 'login successfully',
                    user,
                    token: signed,
                });
            })
            .catch((err) => next(err));
    })(req, res, next);
};

const logout = async (req, res, next) => {
    let token = getToken(req);

    if (!token) {
        return res.json({
            error: 1,
            message: 'Token not provided',
        });
    }

    try {
        const user = await User.findOneAndUpdate(
            { token: { $in: [token] } },
            { $pull: { token: token } },
            { useFindAndModify: false }
        ).exec();

        if (!user) {
            return res.json({
                error: 1,
                message: 'No user found with provided token',
            });
        }

        return res.json({
            error: 0,
            message: 'Logout berhasil',
        });
    } catch (error) {
        return next(error);
    }
};

const me = (req, res, next) => {
    if (!req.user) {
        res.json({
            error: 1,
            message: 'you are not login or token expired',
        });
    }

    res.json(req.user);
};

module.exports = {
    register,
    localStrategy,
    login,
    logout,
    me,
};
