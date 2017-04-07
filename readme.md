# QuizWiz React
<!--[![Build Status](https://travis-ci.org/thechutrain/quizwiz.svg?branch=master)](https://travis-ci.org/thechutrain/quizwiz)-->
> a React.js app built off a RESTful Express.js API

- A small little fun project utilizing the React.js library for viewing data from a RESTful API


## Getting Started
```
$ git clone git@github.com:thechutrain/git@github.com:thechutrain/quizwizReact.git
$ cd quizwizReact && npm install
$ npm start                               // starts the api server
$ cd client && npm install
$ npm start                               // starts webpack server for React fun
```

## Deploying on Heroku

```
$ cd client 
$ npm run build
$ heroku login                   // login into your heroku account
$ heroku create [you-app-name]   // creates your app name
$ git push heroku master          // or if you want to push up a branch $git push heroku [branch-name]:master
```

After you do the previous commands, go to heroku.com and add JAWS_DB as a free add on, and then do the following cmd.

```
$ heroku run sequelize db:migrate --app [your-app-name]  // runs migrations on your database
```

## ERD

![erd](.notes/quizwizERD1.png)
> - rows highlighted in red represent primary or composite keys
> - rows highlighted in yellow represent foreign keys


## Testing
- Unit and intergration test of the API endpoints were written as the queries were made.
- Please submit an issue if you find any bugs. [Issues](https://github.com/thechutrain/quizwiz/issues)


## License
MIT