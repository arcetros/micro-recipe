const cheerio = require("cheerio")

const domains = ["dapurumami"]

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

const selectors = {
  dapurumami: {
    titleSelector: "h1.title",
    ingredientSelector: ".bahanResep > div > div",
    directionsSelector: ".steps > .step p",
    servingsSelector: ".textPorsi > strong",
  },
}

module.exports = {
  domains,
  selectors,
  getDescriptionFromSelector,
  getImageFromSelector,
  getIngredientsFromSelector,
  getDirectionsFromSelector,
}
