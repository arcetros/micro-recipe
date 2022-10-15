const domains = ["stryve"]

const selectors = {
  stryve: {
    titleSelector: "h1",
    ingredientSelector: "ul[class='IngredientList_list__icAZR'] > li",
    _ingredientQty: ".Ingredient_amount__YdGKo",
    _ingredientName: ".Ingredient_name__ZXffJ",
    directionsSelector: "ol > li p",
    authorSelector: "meta[name='twitter:creator']",
  },
}

module.exports = { domains, selectors }
