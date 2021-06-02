import mongoose from 'mongoose'
import User from '../../server/models/User'
import { successResult, errorResult } from '../../server/server'

const userRouter = require('express').Router()

//userRouter.param('id', /^\d+$/)

userRouter.get('/list', (req, res) => {
    const result =  User.find({})
                        .then((data) => successResult(res, data, ""))
                        .catch((err) => errorResult(res, err, "Cant fetch users"))
})

userRouter.get('/profile/:id', (req, res) => {

    console.log(mongoose.Types.ObjectId(req.params.id))
    const result =  User.findById(mongoose.Types.ObjectId(req.params.id))
                        .then((data) => successResult(res, data, ""))
                        .catch((err) => errorResult(res, err, "Cant get users"))
})

userRouter.put('/save', async (req, res) => {
    let doc = User.findByIdAndUpdate(req.body._id, req.body)
    .then(data => successResult(res, data, ""))
    .catch(err => errorResult(res, err, "Cant put users"))
})

module.exports = userRouter