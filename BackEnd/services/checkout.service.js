const { checkouts, carts } = require('../models')

exports.getAllCheckouts = async (req, res) => {

  const data = await checkouts.findAll()

  const dataConvertObject = data.map(checkout => {
    return {
      id: checkout.id,
      customerName: checkout.customerName,
      phoneNumber: checkout.phoneNumber,
      tickets:
        { id: checkout.ticketsId, quantity: checkout.quantity },
      totalPrice: checkout.totalPrice,
      paymentStatus: checkout.paymentStatus
    }
  })

  return {
    status: 200,
    data: dataConvertObject,
    message: "Success Get All Data"
  }
}

exports.createCheckout = async (req, res) => {
  const { id } = req.params;

  const cart = await carts.findOne({ where: { id } })

  if (!cart) {
    return {
      status: 404,
      message: "Cart yang ingin kamu checkout tidak ditemukan"
    }
  }

  const { customerName, phoneNumber, ticketsId, quantity, totalPrice } = cart
  const paymentStatus = 'Lunas'

  await carts.destroy({ where: { id } })

  const data = await checkouts.create({ customerName, phoneNumber, ticketsId, quantity, totalPrice, paymentStatus })

  return {
    status: 201,
    data: data,
    message: "Success Create Data"
  }
}