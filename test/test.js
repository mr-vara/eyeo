var assert = require("chai").assert;
var chai = require("chai");
chai.use(require("chai-fs"));

describe("File Testing", () => {
  it("Assert Screenshot exists ", (done) => {
    assert.isFile("out/screenshot.png");
    done();
  });

  it("Assert Bounding Rectangles file exists ", (done) => {
    assert.isFile("out/bounding_rects.json");
    done();
  });

  it("Assert Bounding Rectangles file content is JSON ", (done) => {
    assert.jsonFile("out/bounding_rects.json");
    done();
  });
});