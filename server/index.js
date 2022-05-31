const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
const port = 3001

app.use(cors())

app.get('/gamerepeated/country', async (req, res) => {
  const { data } = await axios.get('https://api.first.org/data/v1/countries')

  res.send(data)
})

app.listen(port, () => {
  console.log('Server up!')
})
