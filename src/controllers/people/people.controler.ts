import { Response, Request, NextFunction } from 'express'

import peopleService from '../../services/people/people.service'

class PeopleController {
    public async getPeoples(req: Request, res: Response, next: NextFunction,) {
        try {
            const rPeoples = await peopleService.getPeoples()

            res.status(rPeoples.getStatus()).json(rPeoples.getData())
        } catch (error) {
            next(error)
        }
    }
}

export default new PeopleController()