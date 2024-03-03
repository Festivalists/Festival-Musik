const joi = require('joi')

// validasi tambah cart
exports.validateAddCart = (cart) => {
  const schema = joi.object({
    customerName: joi.string().min(3).required(),
    phoneNumber: joi.string().min(3).required(),
    tickets: {
      id: joi.number().min(1).required(),
      quantity: joi.number().min(1).required(),
    }
  })

  return schema.validate(cart)
}

exports.validateEditCart = (cart) => {
  const schema = joi.object({
    customerName: joi.string().min(3).required(),
    phoneNumber: joi.string().min(3).required(),
    tickets: {
      id: joi.number().min(1).required(),
      quantity: joi.number().min(1).required(),
    }
  })

  return schema.validate(cart)
}
