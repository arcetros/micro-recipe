"use strict"

const ScraperFactory = require("../helpers/ScraperFactory")

const recipeScraper = async (url) => {
  let recipe = new ScraperFactory().getScraper(url)
  return await recipe.fetchRecipe(url)
}

module.exports = recipeScraper
