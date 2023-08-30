import { GraphQLList } from 'graphql';
import { ClientType } from '../typeDefs/Client.js';
import { Clients } from '../../entities/Clients.js';

export const GET_CLIENTS = {
  type: new GraphQLList(ClientType),
  resolve() {
    return Clients.find({ order: { id: 'DESC' } });
  },
};
