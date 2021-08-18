import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import { AwilixContainer } from 'awilix'
import { loadControllers, scopePerRequest } from 'awilix-express'
import container, { IContextContainer } from './container'
import { Request, Response, NextFunction } from 'express'
import config from '../config'
import statusCode from '../http-status'


import cookieSession from 'cookie-session'
import cookieParser from 'cookie-parser';
import compression from 'compression';

import {IIdentity, UserRole, IGNORS} from './common'
import {PassportStatic} from 'passport'


const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const passport = container.resolve<PassportStatic>("passport");


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10, 
  bufferMaxEntries: 0
}

const startDatabase = async() =>{
  connectToMongoDb(config.mongo.uri, config.mongo.options)
  startup()
}

app.prepare().then(() => {
  startDatabase()
  const server = express()
  
  server.use(bodyParser.json({ limit: '10mb' }));
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json())
  server.use(cookieSession({
    name: 'session',
    keys: [config.jwtSecret],
    maxAge: 312460601000,
  }));
  server.use(cookieParser());
  server.use(compression());
  server.use(passport.initialize());
  server.use(passport.session());
  server.use(responses);
  server.use(acl);

  server.use(scopePerRequest(container));

  //(config.dev ? 'ts' : 'js')
  const files = 'controllers/**/*.' + 'ts';
  server.use(loadControllers(files, { cwd: __dirname }));

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
    connectionString = connectToMongoDb(config.mongo.uri, config.mongo.options);
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

const responses = (req: Request, res: Response, next: NextFunction) => {
  res.answer = (
        data: any,
        message: any = null,
        status: number = statusCode.OK,
    ) => {

        return res.status(status).json({
            data,
            message
        });
    };

    res.print = (
      pathName: string,
      ssrData: any
    ) =>{
      req.ssrData = ssrData
      app.render(req, res, pathName, req.query);
    } 
  
    next()
}

const acl = (req: Request, res: Response, next: NextFunction) => {

  let useAcl = true
  const url = req.url
  for (const item of IGNORS) {
    if (url.startsWith(item)) {
      useAcl = false
    }
  }

  if (useAcl) {
      const jwt = passport.authenticate('local-jwt', (err, identity: IIdentity) => {
      const isLogged = identity && identity.id && identity.role !== UserRole.guest;
      req.identity = identity;


      if (!isLogged) {
        
      }

      const isAllow = undefined

      if (isAllow) {
        return res.answer(null, statusCode['404_MESSAGE'], statusCode.NOT_FOUND)
      }
    })
    console.log('JWT', jwt);
    
    jwt(req, res, next);
  }

  next()
}




export default{}