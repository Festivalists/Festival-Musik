var express = require('express');
var router = express.Router();

const checkoutController = require('../controllers/checkout.controller');

router.get('/', checkoutController.getAllCheckouts)
router.post('/:id', checkoutController.createCheckout)

module.exports = router;