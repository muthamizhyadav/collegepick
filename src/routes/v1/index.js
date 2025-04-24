const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const blogRoute = require('./blog.router');
const collegeRoute = require('./college.route')
const articleRoute = require('./article.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/blogs',
    route: blogRoute,
  },
  {
    path: '/articles',
    route: articleRoute,
  },
  {
    path: '/college',
    route: collegeRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
