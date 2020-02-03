"use strict";
/**
 * A module which is used for common functions like delay, file read/write, printing logs etc.,
 * @module common
 */
const fs = require("fs");

module.exports = {
  /**
   * Wait for give time.
   * @exports delay
   * @param  {number} time - Time in ms.
   * @return {external:Promise} - A promise to the delay.
   */
  delay: function(time) {
    return new Promise(function(resolve) {
      setTimeout(resolve, time);
    });
  },
  /**
   * Save file to given "path" with specified "content".
   * @exports writeFile
   * @param  {string} path - File path where the file need to save.
   * @param  {string} content - File content to be saved.
   * @return {external:Promise} A promise to the file.
   */
  writeFile: function(path, content) {
    return new Promise(function(resolve, reject) {
      fs.writeFile(path, content, function(err) {
        if (err) {
          return reject(err);
        }
        module.exports.log(`File saved at ${path}`);
        resolve();
      });
    });
  },
  /**
   * Retrieve file from given "path".
   * @exports readFile
   * @param  {string} path - File path where the file reside.
   * @return {external:Promise} A promise to the file.
   */
  readFile: function(path) {
    return new Promise(function(resolve, reject) {
      fs.readFile(path, function(err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    });
  },
  /**
   * Print log "content" into console with current date and time.
   * @exports log
   * @param  {string} content - Log "content" which need to be printed on console.
   */
  log: function(content) {
    console.log(`${new Date().toLocaleString()} ${content}`);
  }
};