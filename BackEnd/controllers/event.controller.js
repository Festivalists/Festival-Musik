const eventService = require('../services/event.service')
const { imageValidations } = require('../validations/image.validation')
const { validateAddEvent, validateEditEvent } = require('../validations/event.validation')

exports.getAllEvents = async (req, res) => {

  const result = await eventService.getAllEvents(req, res)

  return res.status(result.status).json(result)
}

exports.getDetailEvent = async (req, res) => {
  const result = await eventService.getDetailEvent(req, res)

  return res.status(result.status).json(result)
}

exports.createEvent = async (req, res) => {

  let { error } = validateAddEvent(req.body)

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
      data: req.body
    })
  }

  let imageVal = imageValidations(req)

  if (imageVal.error) {
    return res.status(400).json({
      message: imageVal.message
    })

  }

  const result = await eventService.createEvent(req, res)

  return res.status(result.status).json(result)
}

exports.editEvent = async (req, res) => {

  let { error } = validateEditEvent(req.body)

  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    })
  }

  let imageVal = imageValidations(req)

  if (imageVal.error) {
    return res.status(400).json({
      message: imageVal.message
    })
  }

  const result = await eventService.editEvent(req, res)

  return res.status(result.status).json(result)
}

exports.deleteEvent = async (req, res) => {
  const result = await eventService.deleteEvent(req, res)

  return res.status(result.status).json(result)
}