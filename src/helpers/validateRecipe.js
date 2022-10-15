const { validate } = require("jsonschema")
const recipeSchema = require("./RecipeSchema.json")

function defaultError() {
  throw new Error("No recipe found on page")
}

function validateRecipe(recipe) {
  const res = validate(recipe, recipeSchema)
  if (!res.valid) {
    defaultError()
  }
  return recipe
}

module.exports = validateRecipe
