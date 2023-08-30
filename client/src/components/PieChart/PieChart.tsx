import React, { useEffect, useState } from 'react';
import { useQuery } from "@apollo/client";

import styles from './PieChart.module.sass';
import { IPieChartProps } from '../../types/pieChartProps';
import { PieChartSector } from '../PieChartSector';
import { IPieChartSector } from '../../types/pieChartSectorProps';
import { IData } from '../../types/pieChartData';
import { GET_EXPENSES } from '../../graphql/queries/Expenses';
import { IExpenses } from '../../types/expenses';

const DURATION: number = 800;

const PieChart: React.FC<IPieChartProps> = ({ data, radius }) => {
  const [chartSectors, setChartSectors] = useState<IPieChartSector[]>([]);
  const { data: expensesData } = useQuery(GET_EXPENSES, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    const dataTotal = data.reduce((accumulator: IData[], current: IData): IData[] => {
      const existingItem = accumulator.find(item => item.id === current.id);

      if (existingItem) {
        existingItem.amount = existingItem.amount && current.amount ? existingItem.amount + current.amount : current.amount;
      } else {
        accumulator.push({ id: current.id, amount: current.amount });
      }

      return accumulator;
    }, []);

    const expenses = expensesData && expensesData.expenses ? expensesData.expenses : [];

    const categoryList: IExpenses[] = expenses.map((expense: IExpenses) => {
      let total = 0;
      dataTotal.forEach(item => {
        if (item.id === expense.id) {
          total = item.amount || 0;
        }
      })

      return { ...expense, total }
    });

    const chartData = categoryList
      .filter(item => item.total)
      .sort((a, b) => {
        if (b && a && b.total && a.total) {
          return b.total - a.total
        }
        return 0
      });

    const expenseTotal = chartData.reduce((accumulator: number, currentValue) => accumulator + (currentValue.total || 0), 0);

    let accumulator: number = 0;

    const sectors = chartData.map((item): IPieChartSector => {
      const angle = accumulator;
      accumulator = item.total ? (accumulator + (item.total / expenseTotal) * 360) : accumulator;

      return {
        duration: DURATION,
        sectorFraction: item.total ? (item.total !== expenseTotal ? item.total / expenseTotal : 0.9999) : 0,
        radius: radius,
        color: item.color,
        angleRotate: angle,
        label: item.name,
        value: item.total || 0,
      }
    });

    setChartSectors(sectors);
  }, [data, expensesData]);

  return (
    <div className={styles['pie-chart']}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${2 * radius} ${2 * radius}`} width={2 * radius} height={2 * radius}>
        {
          chartSectors && chartSectors.length ?
            chartSectors.map(sector => {
              return (<PieChartSector {...sector} key={sector.color} />)
            }) : null
        }
      </svg>
      {
        chartSectors && chartSectors.length ?

          <div className={styles['chart-legends']}>
            {
              chartSectors.map(sector => {
                return (<div
                  key={`legend-item-${sector.color}`}
                  className={styles['legend-item']}
                >
                  <div className={styles['legend-item-value']}>{sector.value}</div>
                  <div className={styles['legend-item-color']} style={{ backgroundColor: sector.color }} />
                  <div className={styles['legend-item-label']}>{sector.label}</div>
                </div>)
              })
            }
          </div> : null
      }
    </div>
  )
};

export { PieChart };