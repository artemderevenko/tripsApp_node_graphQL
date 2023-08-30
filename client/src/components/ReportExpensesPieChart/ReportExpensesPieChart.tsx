import styles from './ReportExpensesPieChart.module.sass';
import { PieChart } from '../PieChart';
import { IReportExpensesPieChartProps } from '../../types/reportExpensesPieChartProps';
import { IData } from '../../types/pieChartData';
import { ITourExpenses } from '../../types/tourExpenses';
import { PageHeader } from '../PageHeader';
import { NoResults } from '../NoResults';

const ReportExpensesPieChart: React.FC<IReportExpensesPieChartProps> = ({ expenses }) => {
  const pieChartData = expenses && expenses.length ?
    expenses.map((item: ITourExpenses): IData => ({ id: item.expensesId, amount: item.amount })) : [];

  return (
    <div className={styles['expenses-pie-chart-wrap']}>
      <PageHeader align={'start'}>
        <div className={styles['block-title']}>Tour Expenses Distribution</div>
      </PageHeader>
      {
        !pieChartData || !pieChartData.length ?

          <NoResults
            text={<div>There are no expenses in the selected tour yet.</div>}
          /> :

          <div className={styles['chart-wrap']}>
            <PieChart data={pieChartData} radius={180} />
          </div>
      }
    </div>
  )
};

export { ReportExpensesPieChart };