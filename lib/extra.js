"use strict";
/**
 * A module which is used for drawing bounding rectangle.,
 * @module extra
 */
const fs = require("fs");
const Canvas = require("canvas");
const common = require("../lib/common");

module.exports = {
  /**
   * Draw bounding rectangles on page screenshot.
   * @exports module
   * @param  {string} pathToScreenshot - Input screenshot file path.
   * @param  {string} pathToBoundingRects - Path of the file which contains bounding rectangles to draw on input screenshot.
   * @param  {string} pathToMarkedScreenshot - Path of the file where marked screenshot need to be saved.
   */
  drawCoordinates: async function(pathToScreenshot, pathToBoundingRects, pathToMarkedScreenshot) {
    try {
      let screenshot = await common.readFile(pathToScreenshot);
      let img = new Canvas.Image;
      img.src = screenshot;
      let canvas = new Canvas.Canvas(img.width, img.height);
      let ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      let boundingRects = await common.readFile(pathToBoundingRects);
      let _boundingRects = JSON.parse(boundingRects);
      _boundingRects.forEach((boundingRect) => {
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.strokeStyle = "red";
        ctx.rect(boundingRect.x, boundingRect.y, boundingRect.width, boundingRect.height);
        ctx.stroke();
      });
      let markedScreenshot = canvas.toDataURL();
      let _markedScreenshot = markedScreenshot.replace(/^data:image\/\w+;base64,/, "");
      let buf = new Buffer(_markedScreenshot, "base64");
      await common.writeFile(pathToMarkedScreenshot, buf);
    } catch (e) {
      common.log(`Exception occured "${e}"`);
    }
  }
};