import { ITourExpenses } from './tourExpenses';
import { IExpenses } from './expenses';

export interface IExpensesRowProps extends ITourExpenses {
  onChangeRow: (data: ITourExpenses) => void;
  deleteRow: () => void;
  expensesCategory: IExpenses[];
};