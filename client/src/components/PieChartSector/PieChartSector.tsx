import React, { useEffect, useState } from 'react';

import styles from './PieChartSector.module.sass';
import { IPieChartSector } from '../../types/pieChartSectorProps';

const PieChartSector: React.FC<IPieChartSector> = ({ duration, radius, sectorFraction, color, angleRotate }) => {
  const [dashArray, setDashArray] = useState<string>('');

  useEffect(() => {
    const animationStart = performance.now();
    const animationEnd = animationStart + duration;

    const animateDashArray = (timestamp: number) => {
      const progress = Math.min((timestamp - animationStart) / duration, 1);
      const pathData = getPathData(sectorFraction * progress);

      setDashArray(pathData);

      if (timestamp < animationEnd) {
        requestAnimationFrame(animateDashArray);
      }
    };

    requestAnimationFrame(animateDashArray);
  }, [sectorFraction, color, angleRotate]);

  const getPathData = (sectorFraction: number): string => {
    const cx = radius;
    const cy = radius;
    const r = radius;
    const pi = Math.PI;
    const startAngle = (90 * pi) / 180;
    const endAngle = sectorFraction * 2 * pi + startAngle;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const largeArcFlag = endAngle - startAngle <= pi ? '0' : '1';
    const sweepFlag = '1';

    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2} Z`;
  }

  return (
    <g transform={`rotate(${angleRotate || 0}, ${radius}, ${radius})`}>
      <path
        fill={color}
        d={dashArray}>
      </path>
    </g>
  )
};

export { PieChartSector };