const express = require("express")
const cors = require("cors")

const app = express()
const PORT = process.env.port || 3000

app.use(cors)
app.listen(PORT, () => {
  try {
    console.log(`Running on port ${PORT}`)
  } catch (error) {
    throw error
  }
})
