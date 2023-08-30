import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt } from 'graphql';
import { Managers } from '../../entities/Managers.js';
import { Transport } from '../../entities/Transport.js';
import { ClientTour } from '../../entities/ClientTour.js';

export const TourPreviewType = new GraphQLObjectType({
  name: 'TourPreview',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    startDate: { type: GraphQLString },
    endDate: { type: GraphQLString },
    location: { type: GraphQLString },
    managerName: {
      type: GraphQLString,
      async resolve(parent: any, args: any) {
        if (!parent.managerId) return '';

        const manager = await Managers.findOneBy({ id: parent.managerId });
        return manager ? `${manager.firstName} ${manager.lastName} ${manager.middleName} (${manager.passport})` : '';
      },
    },
    touristsCount: {
      type: GraphQLInt,
      async resolve(parent: any, args: any) {
        if (!parent.id) return 0;

        const tourists = await ClientTour.find({ where: { tourId: parent.id } });
        return tourists ? tourists.length : 0;
      },
    },
    seats: { type: GraphQLInt },
    transportName: {
      type: GraphQLString,
      async resolve(parent: any, args: any) {
        if (!parent.transportId) return '';

        const transport = await Transport.findOneBy({ id: parent.transportId });
        return transport ? transport.name : '';
      },
    },
  }),
});
