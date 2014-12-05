var fs = require("fs");
var path = require("path");
var xml2js = require('xml2js');

function recursiveParse(node, allowedkeys, allowedattributes)
{
  if(Array.isArray(node)) {
    var data = [ ];
    for(var i = 0; i < node.length; i++)
    {
      data[i] = recursiveParse(node[i], allowedkeys, allowedattributes);
    }
    return data;
  } else {
    var data = { };

    if(node.$) {
      data.$ = { };
      for(var i = 0; i < allowedattributes.length; i++)
      {
        if(node.$.hasOwnProperty(allowedattributes[i])) {
          data.$[allowedattributes[i]] = node.$[allowedattributes[i]];
        }
      }
    }
    for(var i = 0; i < allowedkeys.length; i++)
    {
      if(node.hasOwnProperty(allowedkeys[i]))
      {
        data[allowedkeys[i]] = recursiveParse(node[allowedkeys[i]], allowedkeys, allowedattributes);
      }
    }
    return data;
  }
}

module.exports = function(options){
  var cache = { };

  var basedir = options.baseDirectory || __dirname;
  var allowedtags = options.allowedTags || ["p", "svg", "g", "path"];
  var allowedattrs = options.allowedAttributes || ["id", "class", "d", "viewBox", "width", "height"];
  var usecache = options.cache || true;

  var parseSVG = function(fpath) {
    var data = fs.readFileSync(fpath);
    var parser = new xml2js.Parser();
    var xmlData = "";
    parser.parseString(data, function (err, result) {
      var sel = recursiveParse(result, allowedtags, allowedattrs);
        var builder = new xml2js.Builder({headless: true});
        xmlData = builder.buildObject(sel);
    });
    return xmlData;
  };
  return function(filepath) {
    var fpath = path.join(basedir, filepath);

    if(!usecache) return parseSVG(fpath);

    var lastchange = fs.statSync(fpath).mtime;
    if(cache.hasOwnProperty(fpath)) {
      if(cache[fpath].date < lastchange) {
        var data = parseSVG(fpath);
        cache[fpath].date = lastchange;
        cache[fpath].string = data;
        return data;
      }
      else {
        return cache[fpath].string;
      }
    }
    else
    {
      var data = parseSVG(fpath);
      cache[fpath] = { date: lastchange, string: data };
      return data;
    }
  }
}
