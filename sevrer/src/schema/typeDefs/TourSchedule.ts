import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';

export const TourScheduleType = new GraphQLObjectType({
  name: 'TourSchedule',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    startDate: { type: GraphQLString },
    endDate: { type: GraphQLString },
    color: { type: GraphQLString },
  }),
});
