import { Router } from 'express'

import TaskRouter from './task.route'
import PeopleRouter from './people.route'


class IndexRoute {
  public router: Router = Router()
  constructor() {
    this.config()
  }

  public async config() {
    this.router.use('/peoples', PeopleRouter)
    this.router.use('/tasks', TaskRouter)
  }
}

const indexRoute = new IndexRoute()
export default indexRoute.router