"use strict"

const { getScraper } = require("../helpers/ScraperFactory")

const recipeScraper = async (url) => {
  let recipe = getScraper(url)
  return await recipe.fetchRecipe(url)
}

module.exports = recipeScraper
