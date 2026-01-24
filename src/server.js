import express from 'express'
import exitHook from 'exit-hook'
import { env } from './config/environment'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb.js'


// config()
const START_SERVER = () => {
  const app = express()

  app.get('/', async (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello ${env.AUTHOR}, Back-end is running at Host http://${ env.APP_HOST }:${ env.APP_PORT }/`)
  })

  exitHook(() => {
    console.log('Closed database')
    CLOSE_DB()
  })
}

//Chỉ khi kết nối tới database thành công thì mới Start server backend
(async () => {
  try {
    await CONNECT_DB()
    console.log('Connected to MongoDb Cloud Atlas')
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()  

//Chỉ khi kết nối tới database thành công thì mới Start server backend
// CONNECT_DB()
// .then(() => { console.log('Connected to MongoDb Cloud Atlas') })
// .then(() => { START_SERVER() })
// .catch((err) => {
//     console.error(err)
//     process.exit(0)
// })