# WWm - WEB WORCKER MODULE

Created for [WebWorcker](https://developer.mozilla.org/ru/docs/DOM/Using_web_workers)

# Exemple use
`url`: this is a link to the file

`data`: this is the data that you want to transfer to the `worker`

`type`: this is the type worcker  `module` or `classic`

```javascript
let instanse = new PromiseWorker({
  url: '/web-worker/index.js',
  type: "module"
})
  .init()
  .invoke(data)
  .then((el) => {
    return el;
  });
```

# Trabls
* the problem is in the react with a link to a file in the src folder, 
I recommend putting your files with workers in the public folder