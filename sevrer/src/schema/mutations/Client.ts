import { GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql';
import { ClientType } from '../typeDefs/Client.js';
import { MessageType } from '../typeDefs/Message.js';
import { Clients } from '../../entities/Clients.js';

export const CREATE_CLIENT = {
  type: ClientType,
  args: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    middleName: { type: new GraphQLNonNull(GraphQLString) },
    birth: { type: new GraphQLNonNull(GraphQLString) },
    sex: { type: new GraphQLNonNull(GraphQLString) },
    passport: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: any) {
    await Clients.insert(args);
    return args;
  },
};

export const UPDATE_CLIENT = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    middleName: { type: new GraphQLNonNull(GraphQLString) },
    birth: { type: new GraphQLNonNull(GraphQLString) },
    sex: { type: new GraphQLNonNull(GraphQLString) },
    passport: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: any) {
    const { id, firstName, lastName, middleName, birth, sex, passport } = args;
    const client = await Clients.findOneBy({id});

    if (client) {
      await Clients.update(id, { firstName, lastName, middleName, birth, sex, passport });
      return { successful: true, message: 'Client edited successfully' }
    } else {
      throw new Error('Client not found');
    }
  },
};

export const DELETE_CLIENT = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const { id } = args;
    await Clients.delete(id);

    return { successful: true, message: 'Client deleted successfully' }
  },
};
