const { carts, events } = require('../models')

exports.getAllCarts = async (req, res) => {

  const data = await carts.findAll()

  const dataConvertObject = data.map(cart => {
    return {
      id: cart.id,
      customerName: cart.customerName,
      phoneNumber: cart.phoneNumber,
      tickets:
        { id: cart.ticketsId, quantity: cart.quantity },
      totalPrice: cart.totalPrice
    }
  })

  return {
    status: 200,
    data: dataConvertObject,
    message: "Success Get All Data"
  }
}

exports.getDetailCart = async (req, res) => {
  const { id } = req.params

  const data = await carts.findOne({ where: { id } })

  if (!data) {
    return {
      status: 404,
      message: "Data Not Found"
    }
  }

  data.dataValues = {
    id: data.dataValues.id,
    customerName: data.dataValues.customerName,
    phoneNumber: data.dataValues.phoneNumber,
    tickets:
      { id: data.dataValues.ticketsId, quantity: data.dataValues.quantity },
    totalPrice: data.dataValues.totalPrice
  }

  return {
    status: 200,
    data,
    message: "Success Get Detail Data"
  }
}

exports.createCart = async (req, res) => {
  const { customerName, phoneNumber, tickets } = req.body

  const event = await events.findOne({ where: { id: tickets.id } })

  if (!event) {
    return {
      status: 404,
      message: "Event yang ingin kamu beli tidak ditemukan"
    }
  }

  const totalPrice = event.price * tickets.quantity;

  const data = await carts.create({ customerName, phoneNumber, ticketsId: tickets.id, quantity: tickets.quantity, totalPrice })

  return {
    status: 201,
    data: req.body,
    message: "Success Create Data"
  }
}

exports.editCart = async (req, res) => {
  const { id } = req.params;

  const data = await carts.findOne({ where: { id } })

  if (!data) {
    return {
      status: 404,
      message: "Data Not Found"
    }
  }

  const { customerName, phoneNumber, tickets } = req.body

  const event = await events.findOne({ where: { id: tickets.id } })

  if (!event) {
    return {
      status: 404,
      message: "Event yang ingin kamu beli tidak ditemukan"
    }
  }

  const totalPrice = event.price * tickets.quantity;

  await carts.update({ customerName, phoneNumber, ticketsId: tickets.id, quantity: tickets.quantity, totalPrice }, { where: { id } })

  return {
    status: 200,
    data: req.body,
    message: "Success Update Data"
  }

}

exports.deleteCart = async (req, res) => {
  const { id } = req.params

  const data = await carts.findOne({ where: { id } })

  if (!data) {
    return {
      status: 404,
      message: "Data Not Found"
    }
  }

  await carts.destroy({ where: { id } })

  return {
    status: 200,
    message: "Success Delete Data"
  }
}