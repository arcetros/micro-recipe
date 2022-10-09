const express = require("express")
const cors = require("cors")
const routes = require("./src/routes")
const app = express()

app.use(routes)
app.use(cors())
const PORT = process.env.port || 3001

app.listen(PORT, () => {
  try {
    console.log(`Running on port ${PORT}`)
  } catch (error) {
    throw error
  }
})
