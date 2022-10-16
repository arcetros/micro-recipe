const domains = ["stryve", "dapurumami"]

const selectors = {
  stryve: {
    titleSelector: "h1",
    ingredientSelector: "ul[class='IngredientList_list__icAZR'] > li",
    _ingredientQty: ".Ingredient_amount__YdGKo",
    _ingredientName: ".Ingredient_name__ZXffJ",
    directionsSelector: "ol > li p",
    authorSelector: "meta[name='twitter:creator']",
  },
  dapurumami: {
    titleSelector: "h1.title",
    ingredientSelector: ".bahanResep > div > div",
    directionsSelector: ".steps > .step p",
    servingsSelector: ".textPorsi > strong",
  },
}

module.exports = { domains, selectors }
