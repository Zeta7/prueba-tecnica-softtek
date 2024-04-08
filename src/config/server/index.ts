import IndexRoutes from '../../routes'
import express, { Express, Request, Response } from 'express'

import {
  boomErrorHandler,
  errorHandler,
} from '../../middlewares/error-handler'

const app: Express = express()

app.use(express.json())

app.use('/api/v1', IndexRoutes)

app.use(boomErrorHandler)
app.use(errorHandler)

app.use((req: Request, res: Response) => {
  return res.status(404).json({
    error: 'Route not found',
  })
})

export default app