import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from './environment.js'

let trelloDatabaseInstance = null

//Khởi tạo 1 đói tượng mongoClientInstace để connect tới MongoDB
const mongoClientInstace = new MongoClient(env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        eprecationErrors: true
    }
})

export const CONNECT_DB = async () => {
    await mongoClientInstace.connect()
    //kết nối thành công thì lấy tên của database gán ngược lại cho biến trelloDatabaseInstance
    trelloDatabaseInstance = mongoClientInstace.db(env.DATABASE_NAME)
    // console.log('Dữ liệu của trelloDatabaseInstance: '+trelloDatabaseInstance)
}

export const GET_DB = () =>{
    if(!trelloDatabaseInstance) throw new Error('Must connect database first !')
        return trelloDatabaseInstance
}

export const CLOSE_DB = async () => {
    await mongoClientInstace.close()
}