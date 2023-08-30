import styles from './ScheduleDaysPagination.module.sass';
import { Pagination } from '../Pagination';
import { CustomButton } from '../CustomButton';
import { IScheduleDaysPaginationProps } from '../../types/scheduleDaysPaginationProps';

const ScheduleDaysPagination: React.FC<IScheduleDaysPaginationProps> = ({ 
  handlePrev, 
  handleNext, 
  scheduleTitle, 
  backToToday,
  className,
  titleClassName,
}) => {
  return (
    <div className={`${styles['schedule-days-pagination']} ${className || ''}`}>
      <div className={styles['today-button']}>
      <CustomButton
        onClick={backToToday}
        buttonText={'Today'}
        type={'confirm'}
      />
      </div>
      <Pagination
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
      <div className={`${styles['schedule-title']} ${titleClassName || ''}`}>{scheduleTitle}</div>
    </div>
  )
};

export { ScheduleDaysPagination };