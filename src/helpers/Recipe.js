function Recipe() {
  this.name = ""
  this.description = "" || undefined
  this.ingredients = []
  this.instructions = []
  this.tags = []
  // this.time = {
  //   prep: "" || undefined,
  //   cook: "" || undefined,
  //   active: "" || undefined,
  //   inactive: "" || undefined,
  //   ready: "" || undefined,
  //   total: "" || undefined,
  // }
  this.servings = "" || "1"
  this.author = {
    name: "" || undefined,
    created_at: "" || undefined,
  }
  this.image = "" || undefined
}

module.exports = Recipe
