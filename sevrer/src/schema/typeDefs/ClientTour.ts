import { GraphQLInputObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { Clients } from '../../entities/Clients.js';

export const ClientTourInputType = new GraphQLInputObjectType({
  name: 'ClientTourInput',
  fields: () => ({
    id: { type: GraphQLID },
    clientId: { type: new GraphQLNonNull(GraphQLString) },
    paymentAmount: { type: GraphQLInt },
    paymentDate: { type: GraphQLString },
    seatNumber: { type: GraphQLInt },
  }),
});

export const ClientTourType = new GraphQLObjectType({
  name: 'ClientTour',
  fields: () => ({
    id: { type: GraphQLID },
    clientId: { type: new GraphQLNonNull(GraphQLString) },
    paymentAmount: { type: GraphQLInt },
    paymentDate: { type: GraphQLString },
    seatNumber: { type: GraphQLInt },
    firstName: {
      type: GraphQLString,
      async resolve(parent: any) {
        if (!parent.clientId) return '';
        const client = await Clients.findOneBy({id: parent.clientId});
        return client ? client.firstName : '';
      },
    },
    lastName: {
      type: GraphQLString,
      async resolve(parent: any) {
        if (!parent.clientId) return '';
        const client = await Clients.findOneBy({id: parent.clientId});
        return client ? client.lastName : '';
      },
    },
    middleName: {
      type: GraphQLString,
      async resolve(parent: any) {
        if (!parent.clientId) return '';
        const client = await Clients.findOneBy({id: parent.clientId});
        return client ? client.middleName : '';
      },
    },
    passport: {
      type: GraphQLString,
      async resolve(parent: any) {
        if (!parent.clientId) return '';
        const client = await Clients.findOneBy({id: parent.clientId});
        return client ? client.passport : '';
      },
    },
  }),
});
