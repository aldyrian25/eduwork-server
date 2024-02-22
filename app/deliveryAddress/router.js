const { police_check } = require('../../middlewares');
const deliveryAddressController = require('./controller');
const router = require('express').Router();

router.post('/delivery-addresses', police_check('create', 'DeliveryAddress'), deliveryAddressController.store);
router.get('/delivery-addresses', police_check('view', 'DeliveryAddress'), deliveryAddressController.index);
router.put('/delivery-addresses/:id', deliveryAddressController.update);
router.delete('/delivery-addresses/:id', deliveryAddressController.destroy);

module.exports = router;
