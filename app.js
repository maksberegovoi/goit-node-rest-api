import 'dotenv/config'
import 'express-async-errors'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import ErrorHandlerMiddleware from './shared/http/middlewares/ErrorHandlerMiddleware.js'
import { sequelize } from './db/db.js'
import * as models from './db/models/index.js'
import router from './routes/router.js'

const app = express()

app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())

app.use('/api', router)

app.use(ErrorHandlerMiddleware)

const start = async () => {
    try {
        await sequelize.authenticate()
        console.log('Database connection successful')

        await sequelize.sync()
        app.listen(3000, () =>
            console.log(`Server is running. Use our API on port: 3000`)
        )
    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}

start()
