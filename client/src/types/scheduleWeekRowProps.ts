import { ITour } from './tour';

export interface IScheduleWeekRowProps {
  tours: ITour[]; 
  daysWeek: moment.Moment[]; 
  className?: string;
}