"use strict"
const parseDomain = require("parse-domain")

const domains = {
  masakapahariini: require("../scrapers/MasakApaHariIni"),
  "101cookbook": require("../scrapers/101CookBook"),
}

class ScraperFactory {
  getScraper(url) {
    let parse = parseDomain(url)
    console.log(parse)
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
  }
}

module.exports = ScraperFactory
