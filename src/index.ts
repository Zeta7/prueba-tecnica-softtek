import app from './config/server/index'

import serverless from 'serverless-http'

module.exports.handler = serverless(app)
