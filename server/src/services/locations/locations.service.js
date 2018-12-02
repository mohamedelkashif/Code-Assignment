// Initializes the `Locations` service on path `/locations`
const createService = require('feathers-mongodb');
const hooks = require('./locations.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/locations', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('locations');

  mongoClient.then(db => {
    service.Model = db.collection('locations');
  });

  service.hooks(hooks);
};
