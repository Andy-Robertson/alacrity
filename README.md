# alacrity

Anti-procrastination app that consistently forces you forward.


# Note for mac os
To run the web app on your local machine:
1. Remove the proxy field from the package.json file.
2. ```cd client```
3. run ``` npm install http-proxy-middleware --save```
4. inside src folder create ``` setupProxy.js```
5. add the following code to ``` setupProxy.js```
``` 
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};
```

> Note: You do not need to import this file anywhere. It is automatically registered when you start the development server.

> Note: This file only supports Node's JavaScript syntax. Be sure to only use supported language features (i.e. no support for Flow, ES Modules, etc).

> Note: Passing the path to the proxy function allows you to use globbing and/or pattern matching on the path, which is more flexible than the express route matching.
