# esmall

> a simple minifier for for es+ code

## 📛 WARNING 📛

This is super jank, likely to break your code.

For best results use semi colons!

## How it works

Does a little [reggae](https://twitter.com/thealphanerd/status/764133752905883649)

## Using the cli

```bash
$ npm install --global esmall
$ esmall input.js // output to stdout
$ esmall input.js -o output.min.js // output to file
$ cat path/to/file.js | esmall > this-works.min.js
```

## Current API

```js
var esmall = require('esmall');
esmall('code', (e, min) => {
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