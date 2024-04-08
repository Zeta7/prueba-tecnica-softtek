import 'dotenv/config'

export const config = {
  tableName: process.env.TABLE_NAME,
  swapi: process.env.SWAPI,
}

module.exports = { config }
