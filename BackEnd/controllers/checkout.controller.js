const checkoutService = require('../services/checkout.service')

exports.getAllCheckouts = async (req, res) => {

  const result = await checkoutService.getAllCheckouts(req, res)

  return res.status(result.status).json(result)
}

exports.createCheckout = async (req, res) => {

  const result = await checkoutService.createCheckout(req, res)

  return res.status(result.status).json(result)
}