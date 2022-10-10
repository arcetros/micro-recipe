const BaseScraper = require("../helpers/CheerioScraper")

class Stryve extends BaseScraper {
  constructor(url) {
    super(url, "stryve.life/")
  }

  scrape($) {
    this.defaultSetImage($)
    this.defaultSetDescription($)
    this.recipe.name = $("h1").text()

    const elementIngredients = $("ul[class='IngredientList_list__icAZR']")
    const elementMetaTime = $(".RecipeMasthead_metaList__Ls__z").find("dd")

    elementIngredients.find(".IngredientList_item__0o8fk").each((i, el) => {
      const quantity = $(el).find(".Ingredient_amount__YdGKo").text()
      const ingredient = $(el).find(".Ingredient_name__ZXffJ").text()

      console.log(quantity)
      this.recipe.ingredients.push(`${quantity} ${ingredient}`)
    })

    $("ol")
      .find("li")
      .each((_, el) => {
        this.recipe.instructions.push(
          $(el)
            .find(".Instruction_description__s7Nt0")
            .text()
            .replace(/\s\s+/g, " ")
            .trim()
        )
      })

    this.recipe.time.total = $(elementMetaTime[0]).text()
    this.recipe.time.prep = $(elementMetaTime[1]).text()
    this.recipe.time.inactive = $(elementMetaTime[2]).text()
    this.recipe.time.cook = $(elementMetaTime[3]).text()
    this.recipe.author.name = $("meta[name='twitter:creator']").attr("content")
  }
}

module.exports = Stryve
