const { events } = require('../models')
const { saveImage } = require('../helpers/saveImage.helper')
const { deleteImageHelper } = require('../helpers/deleteImage.helper')

exports.getAllEvents = async (req, res) => {

  const data = await events.findAll()

  const dataConvertArray = data.map(event => {
    event.performers = event.performers.split('---')
    return event
  })

  return {
    status: 200,
    data: dataConvertArray,
    message: "Success Get All Data"
  }
}

exports.getDetailEvent = async (req, res) => {
  const { id } = req.params

  const data = await events.findOne({ where: { id } })

  if (!data) {
    return {
      status: 404,
      message: "Data Not Found"
    }
  }

  data.dataValues.performers = data.dataValues.performers.split('---')

  return {
    status: 200,
    data,
    message: "Success Get Detail Data"
  }
}

exports.createEvent = async (req, res) => {
  const { festivalName, performers, price } = req.body
  const slug = festivalName.toLowerCase().split(' ').join('-')

  const stringPerformers = performers.join('---')

  const imageFilePath = await saveImage(req.files.image, slug, "event")

  const data = await events.create({ festivalName, performers: stringPerformers, price, image: imageFilePath })

  return {
    status: 201,
    data: req.body,
    message: "Success Create Data"
  }
}

exports.editEvent = async (req, res) => {
  const { id } = req.params;

  const data = await events.findOne({ where: { id } })

  if (!data) {
    return {
      status: 404,
      message: "Data Not Found"
    }
  }

  const { festivalName, performers, price } = req.body
  const slug = festivalName.toLowerCase().split(' ').join('-')

  const stringPerformers = performers.join('---')

  deleteImageHelper(data.image)

  const imageFilePath = await saveImage(req.files.image, slug, "event")

  await events.update({ festivalName, performers: stringPerformers, price, image: imageFilePath }, { where: { id } })

  return {
    status: 200,
    data: req.body,
    message: "Success Update Data"
  }

}

exports.deleteEvent = async (req, res) => {
  const { id } = req.params

  const data = await events.findOne({ where: { id } })

  if (!data) {
    return {
      status: 404,
      message: "Data Not Found"
    }
  }

  deleteImageHelper(data.image)

  await events.destroy({ where: { id } })

  return {
    status: 200,
    message: "Success Delete Data"
  }
}