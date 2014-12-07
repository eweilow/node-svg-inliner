node-svg-inliner
================

Node.js SVG inliner

This is a nifty utility which is used to be able to inline SVG files into web pages served by node.js
It's really simple to use.

```javascript
var inliner = require("node-svg-inliner")(options);

var parsedsvg = inliner("path/to/a/svg/file");
```

The options you can change is below (default values)
```javascript
{
  baseDirectory: __dirname,
  allowedTags: ["p", "svg", "g", "path", "polygon", "rect"],
  allowedAttributes: ["id", "fill", "points", "class", "d", "viewBox", "width", "height", "x", "y", "style", "transform"],
  cache: true
}
```

By setting ``cache`` to true, the inlining cleanup isn't done every time the inliner function is called, but only after a restart or if the file has changed.
