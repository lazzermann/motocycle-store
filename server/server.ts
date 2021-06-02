import mongoose from 'mongoose'
import Test from './models/test'
import User, {UserRole} from './models/User'
import Product, {FuelType} from './models/Product'
import bodyParser from 'body-parser'

const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const users = require('../pages/routes/user')
const products = require('../pages/routes/product')
const categories = require('../pages/routes/category')

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10, 
  bufferMaxEntries: 0
}

const startDatabase = async() =>{
  connectToMongoDb(`mongodb+srv://lazer:lazer@test.b1h2b.mongodb.net/prodBase?retryWrites=true&w=majority`, options)
  startup()
}

app.prepare().then(() => {
  startDatabase()
  const server = express()

  server.use(bodyParser.json({limit: '20mb'}))
  server.use(bodyParser.urlencoded({extended : true}))

  server.use('/user', users)
  server.use('/product', products)
  server.use('/category', categories)

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})

const connectToMongoDb = (uri: string, options: mongoose.ConnectionOptions) =>{
  mongoose.connect(uri, options)
  mongoose.Promise = global.Promise

  mongoose.connection.on('error', (err)=>{
    console.error(`Connection error: ${err}`)
    process.exit(1)
  })

  mongoose.connection.once('open', ()=>{
    console.info('Mongo is connected')
  })

  return mongoose.connection
}

const startup = () => {
  console.info('Start app')
  let connectionString: mongoose.Connection = null
  try {
    console.info('Initializing database ...');
    connectionString = connectToMongoDb(`mongodb+srv://lazer:lazer@test.b1h2b.mongodb.net/prodBase?retryWrites=true&w=majority`, options);
  } catch (e) {
    console.log('ERROR') 
}

}

export const successResult = (res, result, message) =>{
  const resObj: any ={
      success : true,
      message : message,
      data : result
  }
  
  if(message && message !== "")
      resObj['message'] = message

  return res.status(200).json(resObj)
}

export const errorResult = (res, error, message, status = 404) => {
  return res.status(status).json({
      success: false,
      message,
  });
}


export default{}