var express = require('express');
var router = express.Router();

const cartController = require('../controllers/cart.controller');

router.get('/', cartController.getAllCarts)
router.post('/', cartController.createCart)
router.put('/:id', cartController.editCart)
router.delete('/:id', cartController.deleteCart)
router.get('/:id', cartController.getDetailCart)

module.exports = router;