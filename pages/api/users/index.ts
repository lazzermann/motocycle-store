import mongoose from 'mongoose'
import User from '../../../server/models/User'
import Product from '../../../server/models/Product'

export default async function handler(req, res){
    const {method} = req

    const ObjectId = mongoose.Types.ObjectId;



    const result = await Product.find({})
    .populate('user')
    .populate('category');

    console.log('result', result);
    switch (method) {
        case 'GET':
            try{
                res.status(200).json({success: true, data: result})
            }
            catch(err){
                res.status(400).json({success: false, data: result})
            }
            break

        case 'POST':
            try{
                res.status(200).json({success: true, data: result})
            }
            catch(err){
                res.status(400).json({success: false})
        }
            break
        default:
            res.status(400).json({ success: false })
            break

    }
}