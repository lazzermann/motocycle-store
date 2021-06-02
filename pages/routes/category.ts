import mongoose from 'mongoose'
import Category from '../../server/models/Cathegory'
import { successResult, errorResult } from '../../server/server'

const categoryRouter = require('express').Router()

//categoryRouter.param('id', /^\d+$/)

categoryRouter.get('/list', (req, res) => {
    const result =  Category.find({})
                        .then((data) => successResult(res, data, ""))
                        .catch((err) => errorResult(res, err, "Cant fetch users"))
})

// categoryRouter.get('/profile/:id', (req, res) => {

//     console.log(mongoose.Types.ObjectId(req.params.id))
//     const result =  Category.findById(mongoose.Types.ObjectId(req.params.id))
//                         .then((data) => successResult(res, data, ""))
//                         .catch((err) => errorResult(res, err, "Cant fetch users"))
// })

module.exports = categoryRouter