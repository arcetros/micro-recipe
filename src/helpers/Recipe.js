function Recipe() {
  this.name = ""
  this.description = ""
  this.ingredients = []
  this.instructions = []
  this.tags = []
  this.time = {
    prep: "" || undefined,
    cook: "" || undefined,
    active: "" || undefined,
    inactive: "" || undefined,
    ready: "" || undefined,
    total: "" || undefined,
  }
  this.servings = "" || "1"
  this.author = {
    name: "",
    created_at: "",
  }
  this.image = "" || undefined
}

module.exports = Recipe
