"use strict"

const Scraper = require("../helpers/ScraperFactory").ScraperFactory

const recipeScraper = async (url) => {
  let recipe = Scraper.getScraper(url)
  return await recipe.fetchRecipe(url)
}

module.exports = recipeScraper
