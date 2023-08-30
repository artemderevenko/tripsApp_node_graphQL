import { GraphQLInputObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';

export const ExpensesTourInputType = new GraphQLInputObjectType({
  name: 'ExpensesTourInput',
  fields: () => ({
    id: { type: GraphQLID },
    expensesId: { type: new GraphQLNonNull(GraphQLString) },
    amount: { type: new GraphQLNonNull(GraphQLInt) },
    description: { type: GraphQLString },
  }),
});

export const ExpensesTourType = new GraphQLObjectType({
  name: 'ExpensesTour',
  fields: () => ({
    id: { type: GraphQLID },
    expensesId: { type: new GraphQLNonNull(GraphQLString) },
    amount: { type: new GraphQLNonNull(GraphQLInt) },
    description: { type: GraphQLString },
  }),
});
