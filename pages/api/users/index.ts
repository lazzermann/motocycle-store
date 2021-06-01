import mongoose from 'mongoose'
import User from '../../../server/models/User'
import Product from '../../../server/models/Product'

export default async function handler(req, res){
    const {method} = req

    const ObjectId = mongoose.Types.ObjectId;



    const result = await Product.findOne({user: ObjectId('60b5e070c5401a21e230c91a') }).populate('user');

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