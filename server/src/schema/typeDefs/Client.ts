import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull } from 'graphql';

export const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    middleName: { type: new GraphQLNonNull(GraphQLString) },
    birth: { type: new GraphQLNonNull(GraphQLString) },
    sex: { type: new GraphQLNonNull(GraphQLString) },
    passport: { type: new GraphQLNonNull(GraphQLString) },
  }),
});
