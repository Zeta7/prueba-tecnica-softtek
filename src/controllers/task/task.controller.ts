import { Response, Request, NextFunction } from 'express'

import taskService from '../../services/task/task.service'

class TaskController {
    public async getAllTasks(req: Request, res: Response, next: NextFunction) {
        try {
            const rTasks = await taskService.getAllTasks()

            res.status(rTasks.getStatus()).json(rTasks.getData())
        } catch (error) {
            next(error)
        }
    }

    public async getOneTask(req: Request, res: Response, next: NextFunction) {
        try {
            const rTask = await taskService.getOneTask(req.params.id)

            res.status(rTask.getStatus()).json(rTask.getData())
        } catch (error) {
            next(error)
        }
    }

    public async createTask(req: Request, res: Response, next: NextFunction) {
        try {
            const rTask = await taskService.createTask(req.body)

            res.status(rTask.getStatus()).json(rTask.getData())
        } catch (error) {
            next(error)
        }
    }

    public async updateTask(req: Request, res: Response, next: NextFunction) {
        try {
            const rTask = await taskService.updateTask(req.body, req.params.id)

            res.status(rTask.getStatus()).json(rTask.getData())
        } catch (error) {
            next(error)
        }
    }

    public async deleteTask(req: Request, res: Response, next: NextFunction) {
        try {
            const rTask = await taskService.deleteTask(req.params.id)

            res.status(rTask.getStatus()).json(rTask.getData())
        } catch (error) {
            next(error)
        }
    }
}

export default new TaskController()