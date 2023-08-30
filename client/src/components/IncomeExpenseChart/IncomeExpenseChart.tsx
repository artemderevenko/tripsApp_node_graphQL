import React, { useEffect, useState } from 'react';

import styles from './IncomeExpenseChart.module.sass';
import { IIncomeExpenseChartProps } from '../../types/incomeExpenseChartProps';
import { IIncomeChart } from '../../types/incomeChart';

const CHART_WIDTH: number = 1000;
const CHART_HEIGHT: number = 360;
const DURATION: number = 800;

const IncomeExpenseChart: React.FC<IIncomeExpenseChartProps> = ({ expenses, income }) => {
  const [incomPathData, setIncomePathData] = useState<string>('');
  const [expensesPathData, setExpensesPathData] = useState<string>('');

  useEffect(() => {
    const animationStart = performance.now();
    const animationEnd = animationStart + DURATION;

    const animatePathData = (timestamp: number) => {
      const progress = Math.min((timestamp - animationStart) / DURATION, 1);
      const incomPathData = getPathData(income, progress);
      const expensesPathData = getPathData(expenses, progress);

      setIncomePathData(incomPathData);
      setExpensesPathData(expensesPathData);

      if (timestamp < animationEnd) {
        requestAnimationFrame(animatePathData);
      }
    };

    requestAnimationFrame(animatePathData);
  }, [income]);


  const getMax = (array: IIncomeChart[]): number => {
    const values = array.map(item => item.value);
    return Math.max(...values);
  };

  const getScaleStep = (data: IIncomeChart[]) => {
    return data.length > 1 ? CHART_WIDTH / (data.length - 1) : CHART_WIDTH;
  }

  const max = Math.max(getMax(expenses), getMax(income));
  const maxScale = max * 1.2;
  const expensesLastValue = expenses && expenses.length ? expenses[expenses.length - 1].value : 0;
  const incomeLastValue = income && income.length ? income[income.length - 1].value : 0;

  const getPointCoordinates = (step: number, index: number, progress: number, value: number): string => {
    return `${index === 0 ? 'M' : 'L'} ${step * (index)},${CHART_HEIGHT - getPointY(value * progress)}`;
  };

  const getPathData = (data: IIncomeChart[], progress: number) => {
    const scaleStep = getScaleStep(data);

    return data
      .map((dataPoint, index) => getPointCoordinates(scaleStep, index, progress, dataPoint.value))
      .join(' ');
  };

  const getPointY = (value: number): number => {
    return value * CHART_HEIGHT / maxScale;
  }

  return (
    <div className={styles['icome-expense-chart']}>
      <div className={styles['scale']}>
        <div className={styles['expenses-point-wrap']} style={{ bottom: getPointY(expensesLastValue)}}>
          <div className={styles['expenses-point-label']}>{expensesLastValue}</div>
          <div className={styles['expenses-point']} />
        </div>
        <div className={styles['income-point-wrap']} style={{ bottom: getPointY(incomeLastValue)}}>
          <div className={styles['income-point-label']}>{incomeLastValue}</div>
          <div className={styles['income-point']} />
        </div>
        <div className={styles['zero-point-wrap']}>
          <div className={styles['zero-point-label']}>0</div>
        </div>
      </div>
      <div className={styles['chart-wrap']}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          width={`${CHART_WIDTH}`}
          height={`${CHART_HEIGHT}`}
        >
          {/* background dimming area */}
          <path
            fill="#3e8aaf11"
            stroke="none"
            d={`${incomPathData} ${incomPathData ? `L ${CHART_WIDTH},${CHART_HEIGHT} Z` : ''}`}
          />
          {/* expenses chart */}
          <path
            fill="none"
            stroke="#ED6F67"
            strokeWidth="1"
            d={`${expensesPathData}`}
          />
          {/* income chart */}
          <path
            fill="none"
            stroke="#3e8aaf"
            strokeWidth="2"
            d={`${incomPathData}`}
          />
        </svg>
      </div>

      <div className={styles['chart-legends']}>
        <div className={styles['legend-item']}>
          <div className={styles['legend-item-expenses']} />
          <div className={styles['legend-item-label']}>
            Chart displaying the total amount of all expenses in the tour.
            Shows the level of tour cost. Calculated for the current date.
          </div>
        </div>
        <div className={styles['legend-item']}>
          <div className={styles['legend-item-income']} />
          <div className={styles['legend-item-label']}>
            Chart displaying the total amount of all revenues in the tour.
            Shows the received amount in the form of full or partial tour payments.
            Values on the chart above the level of expense chart represent the tour's profit amount.
          </div>
        </div>
      </div>
    </div>
  )
};

export { IncomeExpenseChart };
