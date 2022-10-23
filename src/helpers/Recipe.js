function Recipe() {
  this.name = "" || undefined
  this.description = "" || undefined
  this.ingredients = []
  this.instructions = []
  this.time = {
    prep: "" || undefined,
    cook: "" || undefined,
    active: "" || undefined,
    inactive: "" || undefined,
    ready: "" || undefined,
    total: "" || undefined,
  }
  this.nutritions = undefined
  this.servings = "" || "1"
  this.author = "" || undefined
  this.image = "" || undefined
}

module.exports = Recipe
