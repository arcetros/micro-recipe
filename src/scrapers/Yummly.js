"use strict"

const PuppeteerScraper = require("../helpers/PuppeteerScraper")

class Yummly extends PuppeteerScraper {
  constructor(url) {
    super(url, "yummly.com/recipe")
  }

  scrape($) {
    this.defaultSetImage($)
    this.recipe.description = $("meta[name='description']").attr("content")
    const { ingredients, author, tags, time } = this.recipe
    this.recipe.name = $(".recipe-title").text()

    $(".recipe-tag").each((i, el) => {
      tags.push($(el).find("a").text())
    })

    const data = JSON.parse(
      $("script[type='application/ld+json']")[1].children[0].data
    )

    this.recipe.instructions = data.itemListElement[0].recipeInstructions.map(
      (item) => item.text
    )

    author.name = data.itemListElement[0].author.name

    $(".IngredientLine").each((i, el) => {
      ingredients.push($(el).text())
    })

    time.total =
      $("div.unit").children().first().text() +
      " " +
      $("div.unit").children().last().text()

    this.recipe.servings = $(".unit-serving-wrapper")
      .find(".greyscale-1")
      .text()
      .split(" ")[0]
  }
}

module.exports = Yummly
