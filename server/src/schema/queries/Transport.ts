import { GraphQLList } from 'graphql';
import { TransportType } from '../typeDefs/Transport.js';
import { Transport } from '../../entities/Transport.js';

export const GET_TRANSPORT = {
  type: new GraphQLList(TransportType),
  resolve() {
    return Transport.find({ order: { id: 'ASC' } });
  },
};
