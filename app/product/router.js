const router = require('express').Router();
const { police_check } = require('../../middlewares');
const multer = require('multer');
const os = require('os');

const productController = require('./controller');

router.get('/products', productController.index);
router.post('/products', multer({ dest: os.tmpdir() }).single('image'), police_check('create', 'product'), productController.store);
router.put(
    '/products/:id',
    multer({ dest: os.tmpdir() }).single('image'),
    police_check('update', 'product'),
    productController.update
);
router.delete('/products/:id', police_check('delete', 'product'), productController.destroy);

module.exports = router;
