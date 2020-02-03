"use strict";
const puppeteer = require("puppeteer");
const path = require("path");
const common = require("./lib/common");
const extra = require("./lib/extra");

/**
 * Get bounding rectangles for required anchor elements.
 * @param {Array.<Object>} ads - An array of anchor elements of Ads.
 * @return {Array.<Object>} adTiles - Bounding Rectangles of Ad tiels need to be processed.
 */
function getBoundingRects(ads) {
  let adTiles = [];
  let scrollLeft = window.pageXOffset;
  let scrollTop = window.pageYOffset;

  ads.forEach(function(ad) {
    const {
      width,
      height,
      left,
      top
    } = ad.parentNode.getBoundingClientRect();
    // Adding "pageXOffset" and "pageYOffset" helps to get positions of the adTiles relative to the document instead of viewport.
    adTiles.push({
      "x": left + scrollLeft,
      "y": top + scrollTop,
      "width": width,
      "height": height
    });
  });

  return adTiles;
}

(async () => {
  const pageWidth = 1200;
  const pageHeight = 1200;
  const deviceScaleFactor = 1;
  const pageURL = "https://edition.cnn.com/2015/07/31/world/mh370-debris-investigation/index.html";
  const pathToScreenshot = path.join(__dirname, "out", "screenshot.png");
  const pathToBoundingRects = path.join(__dirname, "out", "bounding_rects.json");
  const pathToMarkedScreenshot = path.join(__dirname, "out", "marked_screenshot.png");
  const pathToExtension = path.join(__dirname, "lib", "abp_chrome");

  // Create Puppeteer browser instance with Adblock Plus enabled.
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`
    ]
  });
  common.log("Browser initiated");

  // Wait 5 seconds for Adblock Plus to initialize and download all needed filter lists.
  await common.delay(5000);
  common.log("5 seconds delayed");

  try {
    // Browse to the sample URL with a viewport of width and height set to 1200px.
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.setViewport({
      width: pageWidth,
      height: pageHeight,
      deviceScaleFactor: deviceScaleFactor
    });
    await page.goto(pageURL, {
      "waitUntil": "networkidle0"
    });
    common.log("Sample page loaded");

    // Scroll to the footer element at the bottom of the page (to make sure all lazy load content loaded successfully).
    await page.evaluate(() => {
      document.querySelector("footer").scrollIntoView();
    });
    common.log("Finished scrolling to footer");

    // Wait for the ads to be loaded. Ads identified based on the URL contained in "onmousedown" event code
    common.log("Waiting for the Ads to be loaded");
    await page.waitForSelector(
      "a[onmousedown^=this\\.href\\=\\'https\\:\\/\\/paid\\.outbrain\\.com\\/] span.ob-unit.ob-rec-text",
      { visible: true }
    );
    await page.waitForSelector(
      "a[onmousedown^=this\\.href\\=\\'https\\:\\/\\/paid\\.outbrain\\.com\\/] img.ob-rec-image.ob-show",
      { visible: true }
    );
    // Get the bounding rectangles (x, y, width, height) of all Ad tiles.
    const boundingRects = await page.$$eval(
      "a[onmousedown^=this\\.href\\=\\'https\\:\\/\\/paid\\.outbrain\\.com\\/]",
      getBoundingRects
    );
    // Screenshot the entire page.
    await page.screenshot({
      path: pathToScreenshot,
      fullPage: true
    });
    common.log("Obtained bounding Rectangles and Screenshot saved successfully");

    // Save the bounding rectangles (x, y, width, height) of all ad tiles to a JSON file.
    await common.writeFile(pathToBoundingRects, JSON.stringify(boundingRects));
    // Draw bounding rectangles on screenshot
    extra.drawCoordinates(pathToScreenshot, pathToBoundingRects, pathToMarkedScreenshot);

    await browser.close();
  } catch (e) {
    await browser.close();
    common.log(`Exception occured: "${e}" \nPlease try again`);
  }
})();
