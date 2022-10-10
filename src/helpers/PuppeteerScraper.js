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
    await page.setRequestInterception(true)

    page.on("request", (interceptedRequest) => {
      const requestUrl = interceptedRequest.url().split("?")[0].split("#")[0]
      if (
        blockedResourceTypes.indexOf(interceptedRequest.resourceType()) !==
          -1 ||
        skippedResources.some((resource) => requestUrl.indexOf(resource) !== -1)
      ) {
        interceptedRequest.abort()
      } else {
        interceptedRequest.continue()
      }
    })

    page.on("error", (err) => {
      let theEmpValue = err.toString()
    })

    page.on("console", (msg) => console.log("PAGE LOG:", msg.text()))

    const response = await page.goto(this.url)

    let html
    if (response.status < 400) {
      await this.customPoll(page)
      html = await page.content()
    }
    browser.close().catch((err) => console.log({ err }))

    if (response.status >= 400) {
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
