Launch webpack with `./node_modules/.bin/webpack serve --mode development` (all files are correctly emitted):

```
<i> [webpack-dev-server] Project is running at:
<i> [webpack-dev-server] Loopback: http://localhost:8080/
<i> [webpack-dev-server] On Your Network (IPv4): http://192.168.1.13:8080/
<i> [webpack-dev-server] On Your Network (IPv6): http://[fe80::1]:8080/
<i> [webpack-dev-server] Content not from webpack is served from '/vhiairrassary/html-webpack-plugin-asset-bug/public' directory
******Assets: ["2.aaa","2.bbb","1.aaa","main.js","1.bbb","index.html"]
assets by path *.aaa 10 bytes
  asset 1.aaa 5 bytes [emitted] [from: src/1.aaa] (auxiliary name: main)
  asset 2.aaa 5 bytes [emitted] [from: src/2.aaa]
assets by path *.bbb 10 bytes
  asset 1.bbb 5 bytes [emitted] [from: src/1.bbb] (auxiliary name: main)
  asset 2.bbb 5 bytes [emitted] [from: src/2.bbb]
asset main.js 288 KiB [emitted] (name: main)
asset index.html 197 bytes [emitted]
webpack 5.64.4 compiled successfully in 362 ms
```

Modify string in `console.log` from `src/index.js` to trigger re-compilation (`index.html` is part of emitted assets but
not the files required inside `index.ejs` (`2.aaa` and `2.bbb`):

```
******Assets: ["1.aaa","main.js","1.bbb","main.0d89c78503f6f63d1cb3.hot-update.js","main.0d89c78503f6f63d1cb3.hot-update.json","index.html"]
assets by status 10 bytes [cached] 2 assets
assets by status 289 KiB [emitted]
  assets by path *.js 289 KiB
    asset main.js 288 KiB [emitted] (name: main)
    asset main.0d89c78503f6f63d1cb3.hot-update.js 1.25 KiB [emitted] [immutable] [hmr] (name: main)
  asset index.html 197 bytes [emitted]
  asset main.0d89c78503f6f63d1cb3.hot-update.json 28 bytes [emitted] [immutable] [hmr]
Entrypoint main 289 KiB (10 bytes) = main.js 288 KiB main.0d89c78503f6f63d1cb3.hot-update.js 1.25 KiB 2 auxiliary assets
webpack 5.64.4 compiled successfully in 37 ms
```

Modify `index.ejs` (this time all files are correctly emitted):

```
******Assets: ["2.aaa","2.bbb","1.aaa","main.js","1.bbb","main.b2aa31b3b119299d831d.hot-update.js","main.b2aa31b3b119299d831d.hot-update.json","index.html"]
assets by status 20 bytes [cached] 4 assets
assets by status 289 KiB [emitted]
  assets by path *.js 288 KiB
    asset main.js 288 KiB [emitted] (name: main)
    asset main.b2aa31b3b119299d831d.hot-update.js 872 bytes [emitted] [immutable] [hmr] (name: main)
  asset index.html 201 bytes [emitted]
  asset main.b2aa31b3b119299d831d.hot-update.json 28 bytes [emitted] [immutable] [hmr]
Entrypoint main 288 KiB (10 bytes) = main.js 288 KiB main.b2aa31b3b119299d831d.hot-update.js 872 bytes 2 auxiliary assets
webpack 5.64.4 compiled successfully in 52 ms
```