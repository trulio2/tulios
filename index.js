import express from 'express'
import bodyParser from 'body-parser'
import router from './api/routes.js'
import 'dotenv/config'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.text())
app.set('trust proxy', true)

app.use(router)

app.listen(process.env.PORT)
