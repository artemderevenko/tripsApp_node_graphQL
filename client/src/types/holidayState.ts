import { IHoliday } from '../types/holiday';

export interface IHolidayState {
  list: Array<Array<{}> | IHoliday[]>;
};