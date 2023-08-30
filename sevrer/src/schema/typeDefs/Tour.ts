import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } from 'graphql';
import { ClientTour } from '../../entities/ClientTour.js';
import { ExpensesTour } from '../../entities/ExpensesTour.js';
import { ClientTourType } from './ClientTour.js';
import { ExpensesTourType } from './ExpensesTour.js';

export const TourType = new GraphQLObjectType({
  name: 'Tour',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    startDate: { type: new GraphQLNonNull(GraphQLString) },
    endDate: { type: new GraphQLNonNull(GraphQLString) },
    location: { type: GraphQLString },
    cost: { type: GraphQLInt },
    managerId: { type: GraphQLString },
    insurance: { type: GraphQLString },
    expenses: {
      type: new GraphQLList(ExpensesTourType),
      async resolve(parent: any) {
        if (!parent.id) return [];
        return await ExpensesTour.find({ where: { tourId: parent.id } });
      },
    },
    touristsList: {
      type: new GraphQLList(ClientTourType),
      async resolve(parent: any) {
        if (!parent.id) return [];
        return await ClientTour.find({ where: { tourId: parent.id } });
      },
    },
    seats: { type: GraphQLInt },
    transportId: { type: GraphQLString },
    color: { type: new GraphQLNonNull(GraphQLString) },
  }),
});
