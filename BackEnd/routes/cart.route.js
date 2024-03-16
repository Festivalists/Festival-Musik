var express = require('express');
var router = express.Router();

const cartController = require('../controllers/cart.controller');
const { auth } = require('../middleware/index.middleware');

router.get('/', auth, cartController.getAllCarts)
router.post('/', auth, cartController.createCart)
router.put('/:id', auth, cartController.editCart)
router.delete('/:id', auth, cartController.deleteCart)
router.get('/:id', auth, cartController.getDetailCart)

module.exports = router;