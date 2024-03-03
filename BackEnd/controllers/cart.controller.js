const cartService = require('../services/cart.service')
const { validateAddCart } = require('../validations/cart.validation')

exports.getAllCarts = async (req, res) => {

  const result = await cartService.getAllCarts(req, res)

  return res.status(result.status).json(result)
}

exports.getDetailCart = async (req, res) => {
  const result = await cartService.getDetailCart(req, res)

  return res.status(result.status).json(result)
}

exports.createCart = async (req, res) => {

  let { error } = validateAddCart(req.body)

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
      data: req.body
    })
  }

  const result = await cartService.createCart(req, res)

  return res.status(result.status).json(result)
}

exports.editCart = async (req, res) => {

  let { error } = validateEditCart(req.body)

  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    })
  }


  const result = await cartService.editCart(req, res)

  return res.status(result.status).json(result)
}

exports.deleteCart = async (req, res) => {
  const result = await cartService.deleteCart(req, res)

  return res.status(result.status).json(result)
}