var express = require('express');
var router = express.Router();

const eventController = require('../controllers/event.controller');

router.get('/', eventController.getAllEvents)
router.post('/', eventController.createEvent)
router.put('/:id', eventController.editEvent)
router.delete('/:id', eventController.deleteEvent)
router.get('/:id', eventController.getDetailEvent)

module.exports = router;