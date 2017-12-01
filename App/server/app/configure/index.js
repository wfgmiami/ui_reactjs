'use strict';

module.exports = (app) => {
  app.setValue = app.set.bind(app);

  app.getValue = (path) => {
    return app.get(path);
  }

  require('./app-variables')(app);

  app.use(app.getValue('log'));

  require('./static-middleware')(app);
  require('./parsing-middleware')(app);

}