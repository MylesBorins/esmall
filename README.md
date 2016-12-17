# esmall

> a simple minifier for for es+ code

## How it works

Just a little wrapper around [babili][babili] with a little [reggae][reggae] to deal with comments

## Using the cli

```bash
$ npm install --global esmall
$ esmall input.js // output to stdout
$ esmall input.js -o output.min.js // output to file
$ cat path/to/file.js | esmall > this-works.min.js
```

## Current API

```js
var Esmall = require('esmall');
var esmall = new Esmall({
  // put babili options here
});
esmall.minify('code', (e, min) => {
  if (e) return console.error(new Error(e));
  console.log(min);
});
```

## This is gross

I know 🎉

## TODO

* stream interface for api
* sync interface for api
* embed babili

### License

Apache v2.0

[babili]: https://github.com/babel/babili "The babili website"
[reggae]: https://twitter.com/thealphanerd/status/764133752905883649 "Some silly twitter stuff"