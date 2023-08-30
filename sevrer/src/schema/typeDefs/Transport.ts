import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull, GraphQLInt } from 'graphql';

export const TransportType = new GraphQLObjectType({
  name: 'Transport',
  fields: () => ({
    id: { type: GraphQLID },
    type: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    seats: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});
