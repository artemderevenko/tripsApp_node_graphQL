import { GraphQLList } from 'graphql';
import { ExpensesType } from '../typeDefs/Expenses.js';
import { Expenses } from '../../entities/Expenses.js';

export const GET_EXPENSES = {
  type: new GraphQLList(ExpensesType),
  resolve() {
    return Expenses.find({ order: { id: 'ASC' } });
  },
};
