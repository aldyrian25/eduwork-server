const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { decodeToken } = require('./middlewares');
const productRoute = require('./app/product/router');
const categoryRoute = require('./app/category/router');
const tagRoute = require('./app/tag/router');
const authRoute = require('./app/auth/router');
const deliveryAddressRoute = require('./app/DeliveryAddress/router');
const cartRoute = require('./app/cart/router');
const orderRoute = require('./app/order/router');
const invoiceRoute = require('./app/invoice/router');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(decodeToken());
app.use('/auth', authRoute);
app.use('/api', productRoute);
app.use('/api', categoryRoute);
app.use('/api', tagRoute);
app.use('/api', deliveryAddressRoute);
app.use('/api', cartRoute);
app.use('/api', orderRoute);
app.use('/api', invoiceRoute);

// Home route
app.use('/', function (req, res) {
    res.render('index', {
        title: 'Eduwork API Service',
    });
});

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.render('error');
});

// Specify the port to listen on
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

