node-svg-inliner
================
[![Build Status](https://travis-ci.org/eweilow/node-svg-inliner.svg?branch=master)](https://travis-ci.org/eweilow/node-svg-inliner)

This inliner is used by me in several projects to inline SVG's in HTML (it prevents stutter and decreases the amount of requests!). It can also be used to clean SVG's.


# Usage
```javascript
var inliner = require("node-svg-inliner")(options);
var parsedsvg = inliner("path/to/a/svg/file");
```

## Options
- `baseDirectory` (default `__dirname`): the directory from which the inliner works relative to
- `allowedTags` (default `["p", "svg", "g", "path", "polygon", "rect"]`): the allowed SVG tags the inliner outputs
- `allowedAttributes` (default `["id", "fill", "points", "class", "d", "viewBox", "width", "height", "x", "y", "style", "transform"]`): the allowed SVG attributes the inliner outputs
- `cache` (default `true`): allow the inliner to cache processed SVG's in memory until the files change
- `removeNewLines` (default `false`): set if the SVG should come out with no newlines and as little whitespace as possible