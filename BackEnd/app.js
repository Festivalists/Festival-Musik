const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const fileUpload = require('express-fileupload')
const joi = require('joi')
const fs = require('fs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

let eventMusic = [
  {
    id: 1,
    festivalName: "Play Fest 22",
    performers: ["Fiersa Besari", "Juicy Luicy", "Club Dangdut Racun"],
    price: 135000,
    image: "/images/play-fest-22.jpg"
  },
  {
    id: 2,
    festivalName: "Play Music Festival 2023 Mataram Lombok NTB",
    performers: ["Tulus", "Mahalini", "Four Twenty"],
    price: 150000,
    image: "/images/play-music-festival-23.jpg"
  },
  {
    id: 3,
    festivalName: "GRIP FEST.iN",
    performers: ["Tulus", "Feel Koplo", "Vierratale", "The Joeys", "Akbar Mandela"],
    price: 175000,
    image: "/images/grip-fest-in.jpg"
  },
]

let carts = [
  {
    id: 1,
    customerName: "Sahal",
    phoneNumber: "08123",
    tickets:
      { id: 1, quantity: 2 },
    totalPrice: 270000
  },
  {
    id: 2,
    customerName: "Jeisa",
    phoneNumber: "085678",
    tickets:
      { id: 2, quantity: 1 },
    totalPrice: 135000
  },
  {
    id: 3,
    customerName: "Genta",
    phoneNumber: "0812345678",
    tickets:
      { id: 3, quantity: 1 },
    totalPrice: 135000
  },
]

let checkouts = [
  {
    id: 1,
    customerName: "Fajri",
    phoneNumber: "08123",
    tickets:
      { id: 1, quantity: 2 },
    totalPrice: 270000,
    paymentStatus: "Lunas"
  },
  {
    id: 2,
    customerName: "Ganela",
    phoneNumber: "085678",
    tickets:
      { id: 1, quantity: 1 },
    totalPrice: 135000,
    paymentStatus: "Lunas"
  },
  {
    id: 3,
    customerName: "Bhatara",
    phoneNumber: "0812345678",
    tickets:
      { id: 1, quantity: 1 },
    totalPrice: 135000,
    paymentStatus: "Lunas"
  },
]

// validasi tambah event
const validateEvent = (event) => {
  const schema = joi.object({
    festivalName: joi.string().min(3).required(),
    performers: joi.array().required(),
    price: joi.number().required(),
  })

  return schema.validate(event)
}

app.get('/', (req, res) => {
  res.send('Welcome to Festivalists')
})

// Route Event Music

// Get All Event & Query by name
app.get('/event', (req, res) => {
  const name = req.query.name

  if (name) {
    const event = eventMusic.filter(event => event.festivalName.toLowerCase().includes(name.toLowerCase()));

    if (!event) {
      res.status(404).json({
        messages: "Data Not Found"
      })
    }

    res.status(200).json({
      messages: "Success Get Detail Data",
      data: event
    })
  }

  res.status(200).json({
    messages: "Success Get All Data",
    data: eventMusic
  })
})

// get detail event by id
app.get('/event/:id', (req, res) => {
  const id = req.params.id

  const event = eventMusic.find(event => event.id == id)

  if (!event) {
    res.status(404).json({
      messages: "Data Not Found"
    })
  }

  res.status(200).json({
    messages: "Success Get Detail Data",
    data: event
  })

})

// add data event
app.post('/event', (req, res) => {
  const { festivalName, performers, price } = req.body

  const id = eventMusic.length != 0 ? eventMusic[eventMusic.length - 1].id + 1 : 1;

  const { error } = validateEvent(req.body)

  if (error) {
    return res.status(400).json({
      messages: error.details[0].message
    })
  }

  if (!req.files) {
    return res.status(400).json({
      messages: 'image is required'
    })
  }

  const image = req.files.image
  const filename = `${festivalName + Math.floor(Math.random() * 9999)}.jpg`

  image.mv(path.join(__dirname, 'public/images', filename))

  const newEvent = {
    id,
    festivalName,
    performers,
    price,
    image: `/images/${filename}`,
  }

  eventMusic.push(newEvent)

  res.status(201).json({
    messages: "Success Add Data",
    data: newEvent
  })
})

// edit event
app.put('/event/:id', (req, res) => {
  const id = req.params.id
  const { festivalName, performers, price } = req.body

  const { error } = validateEvent(req.body)

  if (error) {
    return res.status(400).json({
      messages: error.details[0].message
    })
  }

  const event = eventMusic.find(event => event.id == id)

  if (!event) {
    return res.status(404).json({
      messages: "Data Not Found"
    })
  }

  const fileNameOld = event.image
  event.festivalName = festivalName
  event.performers = performers
  event.price = price

  const image = req.files ? req.files.image : null;

  if (image) {
    try {
      fs.unlinkSync(path.join(__dirname, 'public', fileNameOld))
    } catch (err) {
      console.log(err)
    }
    const filename = `${festivalName + Math.floor(Math.random() * 9999)}.jpg`
    image.mv(path.join(__dirname, 'public/images', filename))
    event.image = `/images/${filename}`
  }

  res.status(200).json({
    messages: "Success Update Data",
    data: event
  })
})

// delete event
app.delete('/event/:id', (req, res) => {
  const id = req.params.id

  const event = eventMusic.find(event => event.id == id)

  if (!event) {
    return res.status(404).json({
      messages: "Data Not Found"
    })
  }

  const index = eventMusic.indexOf(event)
  eventMusic.splice(index, 1)

  // remove image
  const image = event.image
  fs.unlinkSync(path.join(__dirname, 'public', image))

  res.status(200).json({
    messages: "Success Delete Data",
    data: event
  })
})

// validasi tambah cart
const validateCart = (cart) => {
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

// Route Cart

// get all Cart
app.get('/cart', (req, res) => {
  res.status(200).json({
    messages: "Success Get All Data",
    data: carts
  })
})

// get detail cart by id
app.get('/cart/:id', (req, res) => {
  const id = req.params.id

  const cart = carts.find(cart => cart.id == id)

  if (!cart) {
    res.status(404).json({
      messages: "Data Not Found"
    })
  }

  res.status(200).json({
    messages: "Success Get Detail Data",
    data: cart
  })
})

// add data cart
app.post('/cart', (req, res) => {
  const { customerName, phoneNumber, tickets } = req.body

  const { error } = validateCart(req.body)

  if (error) {
    return res.status(400).json({
      messages: error.details[0].message
    })
  }

  const event = eventMusic.find(event => event.id == tickets.id)

  if (!event) {
    return res.status(404).json({
      messages: "Data Event Not Found"
    })
  }

  const id = carts.length != 0 ? carts[carts.length - 1].id + 1 : 1;

  let totalPrice = event.price * tickets.quantity

  const newCart = {
    id,
    customerName,
    phoneNumber,
    tickets,
    totalPrice
  }

  carts.push(newCart)

  res.status(201).json({
    messages: "Success Add Data",
    data: newCart
  })
})

// edit cart
app.put('/cart/:id', (req, res) => {
  const id = req.params.id
  const { customerName, phoneNumber, tickets } = req.body

  const { error } = validateCart(req.body)

  if (error) {
    return res.status(400).json({
      messages: error.details[0].message
    })
  }

  const cart = carts.find(cart => cart.id == id)

  if (!cart) {
    return res.status(404).json({
      messages: "Data Not Found"
    })
  }

  const event = eventMusic.find(event => event.id == tickets.id)

  if (!event) {
    return res.status(404).json({
      messages: "Data Event Not Found"
    })
  }

  let totalPrice = event.price * tickets.quantity

  cart.customerName = customerName
  cart.phoneNumber = phoneNumber
  cart.tickets = tickets
  cart.totalPrice = totalPrice

  res.status(201).json({
    messages: "Success Update Data",
    data: cart
  })
})

// delete cart
app.delete('/cart/:id', (req, res) => {
  const id = req.params.id

  const cart = carts.find(cart => cart.id == id)

  if (!cart) {
    return res.status(404).json({
      messages: "Data Not Found"
    })
  }

  const index = carts.indexOf(cart)
  carts.splice(index, 1)

  res.status(200).json({
    messages: "Success Delete Data",
    data: cart
  })
})


// Route Checkout

// get all Checkout
app.get('/checkout', (req, res) => {
  res.status(200).json({
    messages: "Success Get All Data",
    data: checkouts
  })
})

// add data checkout
app.post('/checkout/:id', (req, res) => {
  const cart = carts.find(cart => cart.id == req.params.id)

  if (!cart) {
    return res.status(404).json({
      messages: "Data Not Found"
    })
  }

  const index = carts.indexOf(cart)
  carts.splice(index, 1)

  const { customerName, phoneNumber, tickets, totalPrice } = cart

  const id = checkouts.length != 0 ? checkouts[checkouts.length - 1].id + 1 : 1;

  const newCheckout = {
    id,
    customerName,
    phoneNumber,
    tickets,
    totalPrice,
    paymentStatus: "Lunas"
  }

  checkouts.push(newCheckout)

  res.status(201).json({
    messages: "Success Add Data",
    data: newCheckout
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 