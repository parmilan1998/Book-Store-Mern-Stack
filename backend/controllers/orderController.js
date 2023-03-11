import asyncHandler from 'express-async-handler'
import Orderbook from '../models/orderModel.js'



const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Orderbook({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})


const getOrderById = asyncHandler(async (req, res) => {
  const order = await Orderbook.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})


const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Orderbook.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
const updateOrderToPaidCash = asyncHandler(async (req, res) => {
  const order = await Orderbook.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
  
    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

const updateShow = asyncHandler(async (req, res) => {
  const order = await Orderbook.findById(req.params.id)

  if (order) {

     order.show = false 

    const updatedShow = await order.save()

    res.json(updatedShow)
  } else {
    res.status(404)
    throw new Error('Show not found')
  }
})


const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Orderbook.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})


const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Orderbook.find({ user: req.user._id })
  res.json(orders)
})

const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Orderbook.findById(req.params.id)

  if (order) {
    await order.remove()
    res.json({ message: 'Order removed' })
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

const getOrders = asyncHandler(async (req, res) => {
  const sort = { length: -1 , createdAt: -1};
  const orders = await Orderbook.find({}).populate('user', 'id name').sort(sort)
  res.json(orders)
})



export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToPaidCash,
  updateOrderToDelivered,
  updateShow,
  getMyOrders,
  getOrders,
  deleteOrder,
  
}
