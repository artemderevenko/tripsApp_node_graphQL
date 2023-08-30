import { GraphQLList, GraphQLID, GraphQLString } from 'graphql';
import moment from 'moment';

import { TourPreviewType } from '../typeDefs/TourPreview.js';
import { TourScheduleType } from '../typeDefs/TourSchedule.js';
import { TourType } from '../typeDefs/Tour.js';
import { Tours } from '../../entities/Tours.js';

export const GET_TOURS = {
  type: new GraphQLList(TourPreviewType),
  async resolve() {
    return Tours.find({ order: { id: 'DESC' } });
  },
};

export const GET_TOUR = {
  type: TourType,
  args: {
    id: { type: GraphQLID },
  },
  resolve(parent: any, args: any) {
    return Tours.findOneBy({ id: args.id });
  },
};

export const GET_TOURS_IN_DATE_RANGE = {
  type: new GraphQLList(TourScheduleType),
  args: {
    startDate: { type: GraphQLString },
    endDate: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { startDate, endDate } = args;
    const tours = await Tours.find({ order: { id: 'DESC' } });

    return tours.filter((tour) => {
      const tourStartDate = moment(tour?.startDate, 'DD/MM/YYYY', true);
      const tourEndDate = moment(tour?.endDate, 'DD/MM/YYYY', true);
      const start = moment(startDate, 'DD/MM/YYYY', true);
      const end = moment(endDate, 'DD/MM/YYYY', true);
      return moment(tourStartDate).isSameOrBefore(end) && moment(tourEndDate).isSameOrAfter(start)
    });
  },
};
