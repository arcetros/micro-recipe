"use strict"

const fetch = require("node-fetch")
const cheerio = require("cheerio")
const { validate } = require("jsonschema")

const Recipe = require("./Recipe")
const recipeSchema = require("./RecipeSchema.json")

class BaseScraper {
  constructor(url, subUrl = "") {
    this.url = url
    this.subUrl = subUrl
  }

  async checkServerResponse() {
    try {
      const res = await fetch(this.url)

      return res.ok // res.status >= 200 && res.status < 300
    } catch (e) {
      console.log(e)
      return false
    }
  }

  checkUrl() {
    if (!this.url.includes(this.subUrl)) {
      throw new Error(`url provided must include '${this.subUrl}'`)
    }
  }

  createRecipeObject() {
    this.recipe = new Recipe()
  }

  defaultError() {
    throw new Error("No recipe found on page")
  }

  defaultSetImage($) {
    this.recipe.image =
      $("meta[property='og:image']").attr("content") ||
      $("meta[name='og:image']").attr("content") ||
      $("meta[itemprop='image']").attr("content")
  }

  defaultSetDescription($) {
    const description =
      $("meta[name='description']").attr("content") ||
      $("meta[property='og:description']").attr("content") ||
      $("meta[name='twitter:description']").attr("content")

    this.recipe.description = description
      ? description.replace(/\n/g, " ").trim()
      : ""
  }

  async fetchDOMModel() {
    try {
      const res = await fetch(this.url)
      const html = await res.text()
      return cheerio.load(html)
    } catch (err) {
      this.defaultError()
    }
  }

  async fetchRecipe() {
    this.checkUrl()
    const $ = await this.fetchDOMModel()
    this.createRecipeObject()
    this.scrape($)
    return this.validateRecipe()
  }

  scrape($) {
    throw new Error("scrape is not defined in BaseScraper")
  }

  textTrim(el) {
    return el.text().trim()
  }

  validateRecipe() {
    let res = validate(this.recipe, recipeSchema)
    if (!res.valid) {
      this.defaultError()
    }
    return this.recipe
  }

  static parsePTTime(ptTime) {
    ptTime = ptTime.replace("PT", "")
    ptTime = ptTime.replace("H", " hours")
    ptTime = ptTime.replace("M", " minutes")
    ptTime = ptTime.replace("S", " seconds")

    return ptTime
  }
}

module.exports = BaseScraper
