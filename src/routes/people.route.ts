import { Router } from 'express'

import peopleControler from '../controllers/people/people.controler'

class PeopleRoutes {
  public router: Router = Router()

  constructor() {
    this.config()
  }

  public async config() {
    this.router.get('/', peopleControler.getPeoples)
  }
}

const routes = new PeopleRoutes()

export default routes.router
