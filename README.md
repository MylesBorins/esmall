# esmall

> a simple minifier for for es+ code

## How it works

Just a little wrapper around [babili][babili]

## Using the cli

```bash
$ npm install --global esmall
$ esmall input.js // output to stdout
$ esmall input.js -o output.min.js // output to file
$ cat path/to/file.js | esmall > this-works.min.js
```

## API

### Basic Usage

```js
var Esmall = require('esmall');
var esmall = new Esmall({
  // put babili options here
});
var minified = esmall.minify('code');
```

### Stream API

```js
var fs = require('fs');

var Esmall = require('esmall');
var esmall = new Esmall({
  // put babili options here
});

fs.createReadStream('path/to/file.js')
  .pipe(esmall)
  .pipe(process.stdout);
```

## This is gross

I know 🎉

## TODO

* sync interface for api
* allow cli to work with multiple files

### License

Apache v2.0

[babili]: https://github.com/babel/babili "The babili website"
[reggae]: https://twitter.com/thealphanerd/status/764133752905883649 "Some silly twitter stuff"