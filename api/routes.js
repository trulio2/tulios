import express from 'express'
const router = express.Router()

router.use('/paper-kit-react', (request, response) => {
  const url = `build/${request.url}`
  response.sendFile(url, { root: '.' })
})

router.get('*', (request, response) => {
  response.sendFile('build/index.html', { root: '.' })
})

export default router
