import { GraphQLList } from 'graphql';
import { ManagerType } from '../typeDefs/Manager.js';
import { Managers } from '../../entities/Managers.js';

export const GET_MANAGERS = {
  type: new GraphQLList(ManagerType),
  resolve() {
    return Managers.find({ order: { id: 'DESC' } });
  },
};
