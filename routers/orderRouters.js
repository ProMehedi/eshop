import express from 'express'
import { Order } from '../models/orderModel.js'

const orderRouters = express.Router()

// Get All Orders
orderRouters.get('/', async (req, res) => {
  const orderList = await Order.find()

  if (!orderList) {
    res.status(500).json({ success: false, message: 'No Order Found!' })
  } else {
    res.status(201).json(orderList)
  }
})

export default orderRouters
