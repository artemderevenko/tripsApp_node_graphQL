import React, { useEffect, useState } from 'react';
import moment from 'moment';

import styles from './ReportIncomeExpenseChart.module.sass';
import { IncomeExpenseChart } from '../IncomeExpenseChart';
import { IReportIncomeExpenseChartProps } from '../../types/reportIncomeExpenseChartProps';
import { ITourExpenses } from '../../types/tourExpenses';
import { PageHeader } from '../PageHeader';
import { NoResults } from '../NoResults';
import { IIncomeChart } from '../../types/incomeChart';

const ReportIncomeExpenseChart: React.FC<IReportIncomeExpenseChartProps> = ({ tour }) => {
  const [expensesDataPoints, setExpensesDataPoints] = useState<IIncomeChart[]>([]);
  const [incomeDataPoints, setIncomeDataPoints] = useState<IIncomeChart[]>([]);

  useEffect(() => {
    const expensesTotal = tour?.expenses?.reduce((accumulator: number, currentValue: ITourExpenses) => {
      if (currentValue && currentValue.amount) {
        return accumulator + currentValue.amount
      }

      return accumulator;
    }, 0);

    const incomeList: IIncomeChart[] = [];

    tour?.touristsList?.forEach(tourist => {
      if (tourist.paymentAmount && tourist.paymentDate) {
        incomeList.push({ value: tourist.paymentAmount, date: tourist.paymentDate })
      }
    });

    const incomeListTotal = incomeList.reduce((accumulator: IIncomeChart[], current: IIncomeChart): IIncomeChart[] => {
      const existingItem = accumulator.find(item => item.date === current.date);

      if (existingItem) {
        existingItem.value = existingItem.value && current.value ? existingItem.value + current.value : current.value;
      } else {
        accumulator.push({ date: current.date, value: current.value });
      }

      return accumulator;
    }, []);

    const sortedIncomeList = incomeListTotal.sort((a, b) => {
      return moment(a.date, "DD/MM/YYYY").diff(moment(b.date, "DD/MM/YYYY"));
    });

    let accumulatedValue: number = 0;

    const incomeData = sortedIncomeList.map(item => {
      accumulatedValue = accumulatedValue + item.value;

      return { ...item, value: accumulatedValue }
    })

    setIncomeDataPoints(
      incomeData && incomeData.length ?
        [
          { date: '', value: 0 },
          ...incomeData,
        ] : []
    );

    setExpensesDataPoints(
      expensesTotal ?
        [
          { date: '', value: expensesTotal || 0 },
          { date: '', value: expensesTotal || 0 }
        ] : []
    );

  }, [tour]);

  return (
    <div className={styles['income-expense-chart-wrap']}>
      <PageHeader align={'start'}>
        <div className={styles['block-title']}>Tour Income and Expense Comparison</div>
      </PageHeader>
      {
        (!expensesDataPoints || !expensesDataPoints.length) && (!incomeDataPoints || !incomeDataPoints.length) ?

          <NoResults
            text={<div>The selected tour has no income or expenses yet.</div>}
          /> :

          <div className={styles['chart-wrap']}>
            <IncomeExpenseChart
              expenses={expensesDataPoints}
              income={incomeDataPoints}
            />
          </div>
      }
    </div>
  )
};

export { ReportIncomeExpenseChart };