"use strict"

const puppeteer = require("puppeteer")
const cheerio = require("cheerio")
const userAgent = require("user-agents")

const blockedResourceTypes = [
  "image",
  "media",
  "font",
  "texttrack",
  "object",
  "beacon",
  "csp_report",
  "imageset",
  "stylesheet",
  "font",
]

const skippedResources = [
  "quantserve",
  "adzerk",
  "doubleclick",
  "adition",
  "exelator",
  "sharethrough",
  "cdn.api.twitter",
  "google-analytics",
  "googletagmanager",
  "google",
  "fontawesome",
  "facebook",
  "analytics",
  "optimizely",
  "clicktale",
  "mixpanel",
  "zedo",
  "clicksor",
  "tiqcdn",
]

const BaseScraper = require("./CheerioScraper")

class PuppeteerScraper extends BaseScraper {
  async customPoll(page) {
    return true
  }

  async fetchDOMModel() {
    const browser = await puppeteer.launch({
      headless: true,
    })
    const page = await browser.newPage()
    await page.setUserAgent(userAgent.random().toString())
    const response = await page.goto(this.url)

    this.customPoll(page)
    let html = await page.content()

    if (response.status() >= 400) {
      this.defaultError()
    }

    return cheerio.load(html)
  }
  static async isElementVisible(page, cssSelector) {
    let visible = true
    await page
      .waitForSelector(cssSelector, { visible: true, timeout: 2000 })
      .catch(() => {
        visible = false
      })
    return visible
  }
}

module.exports = PuppeteerScraper
