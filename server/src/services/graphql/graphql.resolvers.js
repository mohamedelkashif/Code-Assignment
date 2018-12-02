import { merge } from 'lodash';
import addQueryResolvers from './graphql.resolvers.queries.js';

import usersResolvers from '../users/users.resolvers.js';
import apartmentsResolvers from '../apartments/apartments.resolvers.js';
import locationsResolvers from '../locations/locations.resolver.js';

export default function () {
  const app = this;

  const Users = app.service('users');
  const Profiles = app.service('profiles');
  const Apartments = app.service('apartments');
  const Locations = app.service('locations');
  // Adding countries i.e requirements
  const Countries = app.service('countries');

  const rootResolvers = {
    Query: {

    },
  }

  addQueryResolvers(rootResolvers.Query, Users, 'user', 'users');
  addQueryResolvers(rootResolvers.Query, Apartments, 'apartment', 'apartments');
  addQueryResolvers(rootResolvers.Query, Locations, 'location', 'locations');
  // Adding countries i.e one of the requiremnts of the assignment
  addQueryResolvers(rootResolvers.Query, Countries, 'country', 'countries');

  return merge(
    rootResolvers,
    usersResolvers(Profiles),
    apartmentsResolvers(Users, Locations),
    // Adding resolver for locations
    locationsResolvers(Countries)
  );
}
