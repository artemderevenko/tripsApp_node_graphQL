import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull } from 'graphql';

export const ExpensesType = new GraphQLObjectType({
  name: 'Expenses',
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    color: { type: new GraphQLNonNull(GraphQLString) },
  }),
});
