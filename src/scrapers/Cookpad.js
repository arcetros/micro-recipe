"use strict"

const PuppeteerScraper = require("../helpers/PuppeteerScraper")

class Cookpad extends PuppeteerScraper {
  constructor(url) {
    super(url, "cookpad.com/")
  }

  scrape($) {
    this.defaultSetDescription($)
  }
}

module.exports = Cookpad
