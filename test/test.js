var assert = require("assert")

describe('Options', function() {
  it('should not error if file not found', function () {
    var inliner = require("../index.js")();
    var parsedsvg = inliner("abc.svg");
    assert.equal(!!!parsedsvg, true);
  });
  describe('baseDirectory', function () {
    it('should load input.svg when set to ./test', function () {
      var inliner = require("../index.js")({baseDirectory: "./test"});
      var parsedsvg = inliner("input.svg");
      assert.equal(!!parsedsvg, true);
    });
    it('should not load input.svg when set to null', function () {
      var inliner = require("../index.js")();
      var parsedsvg = inliner("input.svg");
      assert.equal(!!!parsedsvg, true);
    });
  });
  describe('removeNewLines', function() {
    it('should load input.svg with it set to true and not contain newlines', function () {
      var inliner = require("../index.js")({baseDirectory: "./test", removeNewLines: true});
      var parsedsvg = inliner("input.svg");
      
      assert.ok(parsedsvg.search(/(\r\n|\n|\r)/) < 0);
    });
    it('should load input.svg with it set to false and contain newlines', function () {
      var inliner = require("../index.js")({baseDirectory: "./test", removeNewLines: false});
      var parsedsvg = inliner("input.svg");
      
      assert.ok(parsedsvg.search(/(\r\n|\n|\r)/) >= 0);
    });
  });
  describe('allowedTags', function() {
    it('should load input.svg with it set to ["svg"] and only contain <svg> tags', function () {
      var inliner = require("../index.js")({baseDirectory: "./test", allowedTags: ["svg"], removeNewLines: true});
      var parsedsvg = inliner("input.svg");
      assert.equal(parsedsvg, '<svg width="400" height="110"/>');
    });
    it('should load input.svg with it set to ["svg", "rect"] and only contain <svg> and <rect> tags', function () {
      var inliner = require("../index.js")({baseDirectory: "./test", allowedTags: ["svg", "rect"], removeNewLines: true});
      var parsedsvg = inliner("input.svg");
      assert.equal(parsedsvg, '<svg width="400" height="110"><rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)"/></svg>');
    });
  });
  describe('allowedAttributes', function() {
    it('should load input.svg with it set to ["width"] and only contain width attributes', function () {
      var inliner = require("../index.js")({baseDirectory: "./test", allowedAttributes: ["width"], removeNewLines: true});
      var parsedsvg = inliner("input.svg");
      assert.equal(parsedsvg, '<svg width="400"><p/><rect width="300"/></svg>');
    });
    it('should load input.svg with it set to ["height"] and only contain height attributes', function () {
      var inliner = require("../index.js")({baseDirectory: "./test", allowedAttributes: ["height"], removeNewLines: true});
      var parsedsvg = inliner("input.svg");
      assert.equal(parsedsvg, '<svg height="110"><p height="5"/><rect height="100"/></svg>');
    });
  });
});