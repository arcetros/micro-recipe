const axios = require("axios")
const cheerio = require("cheerio")
const parseDomain = require("parse-domain")
const Recipe = require("../helpers/Recipe")
const getResponseAlt = require("./AlternativeScraper")
const validateRecipe = require("./validateRecipe")

const { domains: supportedDomains, selectors } = require("./domains")

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

function getDescriptionFromSelector(html) {
  const $ = cheerio.load(html)
  const description =
    $("meta[property='og:description']").attr("content") ||
    $("meta[name='description']").attr("content") ||
    $("meta[name='twitter:description']").attr("content")
  return description ? description.replace(/\n/g, " ").trim() : ""
}

function getImageFromSelector(html) {
  const $ = cheerio.load(html)
  const image =
    $("meta[property='og:image']").attr("content") ||
    $("meta[name='og:image']").attr("content") ||
    $("meta[itemprop='image']").attr("content")
  return image
}

function getIngredientsFromSelector(html, selector) {
  const $ = cheerio.load(html)
  const { ingredientSelector, _ingredientQty, _ingredientName } = selector
  const ingredients = []
  $(ingredientSelector).each((_, el) => {
    let qty, name
    if (_ingredientQty) qty = $(el).find(_ingredientQty).text()
    if (_ingredientName) name = $(el).find(_ingredientName).text()

    const value = `${qty ?? ""} ${name ?? $(el).text().trim()}`

    ingredients.push(value.trim())
  })
  return ingredients
}

function getDirectionsFromSelector(html, selector) {
  const $ = cheerio.load(html)
  const _directions = $(selector)
  let directions = []
  _directions.each((_, el) => {
    directions.push($(el).text().replace(/\s\s+/g, " ").trim())
  })
  return directions
}

module.exports = {
  getResponse,
  getDescriptionFromSelector,
  getImageFromSelector,
}
