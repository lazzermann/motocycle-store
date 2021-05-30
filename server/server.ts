import mongoose from 'mongoose'
// import Test from './models/test'


const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10, 
  bufferMaxEntries: 0
}

const startDatabase = () =>{
  connectToMongoDb(`'mongodb://localhost:27017/testBase`, options)
  startup()
}

app.prepare().then(() => {
  startDatabase()
  const server = express()

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
    connectionString = connectToMongoDb(`'mongodb://localhost:27017/testBase`, options);
} catch (e) {
    console.log('ERROR') 
}

}

// const createShema = async()=> {

// await Test.create({
//     email: '',
//     firstName: 'aa',
// })

// }

export default{}