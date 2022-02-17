import express from 'express'
import bodyParser from 'body-parser'
import 'dotenv'

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.text())

app.use('/paper-kit-react', (request, response) => {
  const url = `build/${request.url}`
  response.sendFile(url, { root: '.' })
})

app.get('*', (request, response) => {
  response.sendFile('build/index.html', { root: '.' })
})

app.listen(process.env.PORT || 8080)
