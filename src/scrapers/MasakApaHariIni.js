const BaseScraper = require("../helpers/CheerioScraper")

class MasakApaHariIni extends BaseScraper {
  constructor(url) {
    super(url, "masakapahariini.com/")
  }

  scrape($) {
    this.defaultSetImage($)
    this.defaultSetDescription($)

    const { ingredients, instructions, time } = this.recipe
    const elementHeader = $("#recipe-header")
    const elementIngredients = $("#ingredients-section")
    const elementInstructions = $("#steps-section")

    this.recipe.name = elementHeader.find(".title").text()

    let ingredientsArr = []

    elementIngredients
      .find(".ingredient-groups")
      .find(".ingredients")
      .find(".ingredient-item")
      .each((_, el) => {
        let term = []
        let quantity, ingredient, ingredients, metaIngredient, parseIngredient

        quantity = $(el).find(".quantity").text()
        metaIngredient = $(el).find(".ingredient").text()
        parseIngredient = metaIngredient.split("\n")[1].split(" ")
        parseIngredient.forEach((r) => {
          if (r !== "") term.push(r)
        })

        ingredient = Array.from(term).join(" ")
        ingredients = `${quantity} ${ingredient}`
        ingredientsArr.push(ingredients)
      })

    this.recipe.ingredients = ingredientsArr

    let step, resultStep
    let stepArr = []
    elementInstructions
      .find(".steps")
      .find(".step")
      .each((_, el) => {
        step = $(el).find(".step-description").find("p").text()
        resultStep = step
        stepArr.push(resultStep)
      })
    this.recipe.instructions = stepArr
  }
}

module.exports = MasakApaHariIni
