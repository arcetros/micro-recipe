const axios = require("axios")
const cheerio = require("cheerio")
const parseDomain = require("parse-domain")
const Recipe = require("../helpers/Recipe")
const getResponseAlt = require("./AlternativeScraper")
const validateRecipe = require("./validateRecipe")

const {
  domains: supportedDomains,
  selectors,
  getDescriptionFromSelector,
  getImageFromSelector,
  getIngredientsFromSelector,
  getDirectionsFromSelector,
} = require("./selectors/index")

function isDomainSupported(domain) {
  return supportedDomains.find((d) => d === domain) !== undefined
}

async function getResponse(url) {
  const _axios = axios.create()
  const parse = parseDomain(url)

  if (parse) {
    let domain = parse.domain
    if (isDomainSupported(domain)) {
      return _axios.get(url).then((response) => {
        const html = response.data
        return getRecipeData(domain, html)
      })
    } else {
      return _axios.get(url).then((response) => {
        const html = response.data
        return getResponseAlt(html)
      })
    }
  } else {
    throw new Error("Failed to parse domain")
  }
}

function getRecipeData(domain, html) {
  const $ = cheerio.load(html)
  const recipe = new Recipe()
  const {
    titleSelector,
    ingredientSelector,
    _ingredientQty,
    _ingredientName,
    directionsSelector,
    authorSelector,
    servingsSelector,
  } = selectors[domain]

  recipe.name = $(titleSelector).text().trim()
  recipe.image = getImageFromSelector(html)
  recipe.description = getDescriptionFromSelector(html)
  recipe.ingredients = getIngredientsFromSelector(html, {
    ingredientSelector,
    _ingredientName,
    _ingredientQty,
  })
  recipe.instructions = getDirectionsFromSelector(html, directionsSelector)
  recipe.servings = $(servingsSelector).text()
  recipe.author = $(authorSelector).attr("content") || undefined

  return validateRecipe(recipe)
}

module.exports = {
  getResponse,
}
