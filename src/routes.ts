import { Router } from 'express'

import PlayerController from './controllers/PlayerController'

const routes = Router()

routes.get('/player/:sid64', PlayerController.updateStats)

export default routes
