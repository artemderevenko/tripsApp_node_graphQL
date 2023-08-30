import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { GET_CLIENTS } from './queries/Client.js';
import { GET_MANAGERS } from './queries/Manager.js';
import { GET_EXPENSES } from './queries/Expenses.js';
import { GET_TOURS, GET_TOUR, GET_TOURS_IN_DATE_RANGE } from './queries/Tour.js';
import { GET_TRANSPORT } from './queries/Transport.js';
import { CREATE_CLIENT, DELETE_CLIENT, UPDATE_CLIENT } from './mutations/Client.js';
import { CREATE_MANAGER, DELETE_MANAGER, UPDATE_MANAGER } from './mutations/Manager.js';
import { CREATE_TOUR, UPDATE_TOUR, DELETE_TOUR } from './mutations/Tour.js';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getClients: GET_CLIENTS,
    getManagers: GET_MANAGERS,
    getExpenses: GET_EXPENSES,
    getTours: GET_TOURS,
    getTour: GET_TOUR,
    getToursInDateRange: GET_TOURS_IN_DATE_RANGE,
    getTransport: GET_TRANSPORT,
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createClient: CREATE_CLIENT,
    deleteClient: DELETE_CLIENT,
    updateClient: UPDATE_CLIENT,
    createManager: CREATE_MANAGER,
    deleteManager: DELETE_MANAGER,
    updateManager: UPDATE_MANAGER,
    createTour: CREATE_TOUR,
    updateTour: UPDATE_TOUR,
    deleteTour: DELETE_TOUR,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
