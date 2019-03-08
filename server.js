// this file is used to get things running on Glitch. NO other files were changed, except for package.json "script" "start" "node server.js"


const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const staticMiddleware = require('express').static;

// serve content out of 'public' as is
server.use(staticMiddleware('public'));

server.use('/api', router);

server.listen(3000, () => {
    console.log('JSON Server is running')
});


//Don't need the following but may be helpful in future on other npm projects:
// const webpack = require('webpack');
// const webpackConfig = require('./webpack.config');
// const webpackMiddleware = require("webpack-dev-middleware");

// server.use(webpackMiddleware(webpack(webpackConfig), {
//   publicPath: "/dist/",
// }));