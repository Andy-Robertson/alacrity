# alacrity

## Product Statement

When was the last time you wanted to do something but did not get around to it, that's why we built Alacrity, Alacrity is an app that allows users to track tasks and manage their time effectively to help combat procrastination. This project was developed as the final project for CYF developer course.


## List of Main Features

* Task System
* Text Notifications
* Audio Notifications
* Scheduled Reminder Emails
* Analytics System 
* Social media Login (Twitter, Facebook, Github, Google)
* Pomodoro system
* Focus Mode
* Settings (Pomodoro time, sound and/or text notifications)
* Responsiveness

## Team Gravity & Contributions

### Abadi Salman
LinkedIn: https://www.linkedin.com/in/abadi-salman/ 
#### Contribution: 
- Task System - Adding & Editing 
- Text Notifications
- Scheduled Reminder Emails
- Analytics System 
- Core Routing 
- Database 

### Andy Robertson
Linkedin:  https://www.linkedin.com/in/andy~robertson
#### Contribution:
- Social media Login system
- Pomodoro system
- Task system - Archive & Task completion
- Focus Mode
- Animations
- Settings
- Audio Notifications
- App deployment (dev / prod)

### Aj Bader
Linkedin: https://www.linkedin.com/in/aj-bader-39129266/
#### Contribution:
- Web Design
- User interface
- User experience
- Front-end
- Bug Fixing

# How to run alacrity in developer mode

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

## Preview

Main Dashboard
![Alacrity-APP](https://i.ibb.co/SwcHy0q/alacrity.png)
