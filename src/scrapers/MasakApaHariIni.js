const BaseScraper = require("../helpers/CheerioScraper")

class MasakApaHariIni extends BaseScraper {
  constructor(url) {
    super(url, "masakapahariini.com/")
  }

  scrape($) {
    this.defaultSetImage($)
    this.defaultSetDescription($)

    const elementHeader = $("#recipe-header")
    const elementIngredients = $("#ingredients-section")
    const elementInstructions = $("#steps-section")
    const elementTags = $("#share-and-tags")

    this.recipe.name = elementHeader.find(".title").text()
    this.recipe.author.name = elementHeader.find(".author").text()
    this.recipe.author.created_at = new Date(
      elementHeader.find(".date").text()
    ).toLocaleDateString()

    elementHeader.find(".recipe-info").each((_, el) => {
      let totalduration = $(el).find(".time").find("small").text()
      let servings = $(el).find(".servings").find("small").text()

      let servingsArr = []

      if (totalduration.includes("\n") && servings.includes("\n")) {
        const parsedDuration = totalduration.split("\n")[1].split(" ")
        parsedDuration.forEach((r) => {
          if (r !== "") totalduration = r
        })

        const parsedServings = servings.split("\n")[1].split(" ")
        parsedServings.forEach((r) => {
          if (r !== "") servings = servingsArr.push(r)
        })
      }

      this.recipe.time.total = totalduration
      this.recipe.servings = Array.from(servingsArr).join(" ")[0]
    })

    elementIngredients
      .find(".ingredient-groups")
      .find(".ingredients")
      .find(".ingredient-item")
      .each((_, el) => {
        let term = []

        const quantity = $(el).find(".quantity").text()
        const metaIngredient = $(el).find(".ingredient").text()
        const parseIngredient = metaIngredient.split("\n")[1].split(" ")
        parseIngredient.forEach((r) => {
          if (r !== "") term.push(r)
        })

        let ingredient = Array.from(term).join(" ")
        this.recipe.ingredients.push(`${quantity} ${ingredient}`)
      })

    elementInstructions
      .find(".steps")
      .find(".step")
      .each((_, el) => {
        this.recipe.instructions.push(
          $(el).find(".step-description").find("p").text()
        )
      })

    elementTags.find(".post-tags a").each((i, el) => {
      let tag = $(el).text()
      this.recipe.tags.push(tag)
    })
  }
}

module.exports = MasakApaHariIni
