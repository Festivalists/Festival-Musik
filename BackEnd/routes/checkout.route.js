var express = require('express');
var router = express.Router();

const checkoutController = require('../controllers/checkout.controller');
const { auth } = require('../middleware/index.middleware');

router.get('/', checkoutController.getAllCheckouts)
router.post('/:id', auth, checkoutController.createCheckout)

module.exports = router;