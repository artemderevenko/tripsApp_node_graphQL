import { DAYS_OF_WEEK as daysOfWeek } from '../../constants/daysOfWeek';
import styles from './ScheduleDaysHeader.module.sass';
import { IScheduleDaysHeaderProps } from '../../types/scheduleDaysHeaderProps';

const ScheduleDaysHeader: React.FC<IScheduleDaysHeaderProps> = ({ mode }) => {
  return (
    <div className={styles[`day-names-header-${mode}`]}>
      {
        daysOfWeek && daysOfWeek.length ?
          daysOfWeek.map(day => {
            return (<div
              key={day.label}
              className={styles[`day-name-${mode}`]}
            >
              {day.label}
            </div>)
          }) : null
      }
    </div>
  )
};

export { ScheduleDaysHeader };