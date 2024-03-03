const joi = require('joi')

// validasi tambah event
exports.validateAddEvent = (event) => {
  const schema = joi.object({
    festivalName: joi.string().min(3).required(),
    performers: joi.array().required(),
    price: joi.number().required(),
  })

  return schema.validate(event)
}

exports.validateEditEvent = (event) => {
  const schema = joi.object({
    festivalName: joi.string().min(3).required(),
    performers: joi.array().required(),
    price: joi.number().required(),
  })

  return schema.validate(event)
}