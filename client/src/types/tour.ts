import { ITourist } from './tourist';
import { ITourExpenses } from './tourExpenses';

export interface ITour {
  [key: string]: any;
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  cost: number | null;
  managerId: string;
  insurance: string | null;
  touristsList: ITourist[];
  seats: number | null;
  transportId: string;
  color: string | null;
  expenses: ITourExpenses[];
  transportName?: string;
  managerName?: string;
};