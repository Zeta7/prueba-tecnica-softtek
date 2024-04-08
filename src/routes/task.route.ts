import { Router } from 'express'

import TaskController from '../controllers/task/task.controller'

class PeopleRoutes {
  public router: Router = Router()

  constructor() {
    this.config()
  }

  public async config() {
    this.router.get('/', TaskController.getAllTasks)
    this.router.get('/:id', TaskController.getOneTask)
    this.router.post('/', TaskController.createTask)
    this.router.put('/:id', TaskController.updateTask)
    this.router.delete('/:id', TaskController.deleteTask)
  }
}

const routes = new PeopleRoutes()

export default routes.router
