const router = require("express").Router()
const { domains } = require("../helpers/selectors/index")
const getResponse = require("../helpers/BaseScraper").getResponse

const route = router

route.get("/", (_, res) => {
  res.send({
    greet: "Hello there, muggles 🧙‍♂️ !",
    message: "Visit link down below for documentation about this API",
    documentation: "https://github.com/arcetros/retractum-api",
  })
})

route.get("/api/search/", async (req, res) => {
  try {
    const recipe = await getResponse(req.query.q)
    res.send({
      method: req.method,
      status: true,
      message: "success",
      results: recipe,
    })
  } catch (err) {
    const error =
      err.response?.status > 400
        ? "Site not yet supported or forbidden to access this domain"
        : err.message
    res.send({ method: req.method, status: false, message: error })
  }
})

route.get("/api/domains", (_, res) => {
  res.status(200).send({ domains })
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
