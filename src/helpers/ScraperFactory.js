"use strict"
const parseDomain = require("parse-domain")

const domains = {
  masakapahariini: require("../scrapers/MasakApaHariIni"),
  stryve: require("../scrapers/Stryve"),
  yummly: require("../scrapers/Yummly"),
  // cookpad: require("../scrapers/Cookpad"),
}

const ScraperFactory = {
  getScraper: (url) => {
    let parse = parseDomain(url)
    if (parse) {
      let domain = parse.domain
      if (domains[domain] !== undefined) {
        return new domains[domain](url)
      } else {
        throw new Error("Site not yet supported")
      }
    } else {
      throw new Error("Failed to parse domain")
    }
  },
}

module.exports = { ScraperFactory, domains }
