import express from 'express'
import mongoose from 'mongoose'

import routes from './routes'
require('dotenv').config()

class App {
  public express: express.Application

  public constructor () {
    this.express = express()

    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
  }

  private database (): void {
    mongoose.connect(`${process.env.MONGOOSE_CONNECT_STRING}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  private routes () : void {
    this.express.use(routes)
  }
}

export default new App().express
