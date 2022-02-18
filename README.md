# alacrity

Anti-procrastination app that consistently forces you forward.

# How run alacrity in developer mode

1. Rename ```template.env_``` in the server folder to ```template.env```.
2. Add credentials to at lease one authentication provider (twitter, Google, Github or Facebook) to ```template.env_```.
3. Setup a local postgress database using the ```server.sql``` file found in the server folder.
4. If you wish to recieve email notifications you can add an active email and password to ```NODEMAILER```
5. Start the frontend with ```npm start``` from the client folder
6. Start the backend server with ```node server.js```

# Note for mac os
To run the web app on your local machine:
1. ```cd client```
2. Remove the proxy field from the ```package.json``` file.
3. run ``` npm install http-proxy-middleware --save```
4. inside ```src``` folder create ``` setupProxy.js```
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
