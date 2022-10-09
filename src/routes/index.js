const router = require("express").Router()
const recipeScraper = require("../scrapers/index")

const route = router

route.get("/", (_, res) => {
  res.send({
    greet: "Hello there, muggles 🧙‍♂️ !",
    message: "Visit link down below for documentation about this API",
    documentation: "https://github.com/arcetros/retractum-api",
  })
})

route.get("/api/*", async (req, res) => {
  await recipeScraper(req.params[0])
    .then((recipe) => {
      res.send({ recipe })
    })
    .catch((err) => {
      res.send({ message: err.message })
    })
})

route.get("*", (req, res) => {
  res.status(404).json({
    method: req.method,
    message:
      "Cant find spesific endpoint, please make sure you read a documentation",
    status: false,
    code: 401,
  })
})

module.exports = route
