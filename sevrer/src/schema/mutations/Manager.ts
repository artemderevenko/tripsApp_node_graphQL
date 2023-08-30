import { GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql';
import { ManagerType } from '../typeDefs/Manager.js';
import { MessageType } from '../typeDefs/Message.js';
import { Managers } from '../../entities/Managers.js';

export const CREATE_MANAGER = {
  type: ManagerType,
  args: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    middleName: { type: new GraphQLNonNull(GraphQLString) },
    birth: { type: new GraphQLNonNull(GraphQLString) },
    sex: { type: new GraphQLNonNull(GraphQLString) },
    passport: { type: new GraphQLNonNull(GraphQLString) },
  },
  async resolve(parent: any, args: any) {
    await Managers.insert(args);
    return args;
  },
};

export const UPDATE_MANAGER = {
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
    const manager = await Managers.findOneBy({id});

    if (manager) {
      await Managers.update(id, { firstName, lastName, middleName, birth, sex, passport });
      return { successful: true, message: 'Manager edited successfully' }
    } else {
      throw new Error('Manager not found');
    }
  },
};

export const DELETE_MANAGER = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const { id } = args;
    await Managers.delete(id);

    return { successful: true, message: 'Manager deleted successfully' }
  },
};
