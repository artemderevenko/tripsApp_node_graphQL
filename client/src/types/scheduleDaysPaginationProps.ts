export interface IScheduleDaysPaginationProps {
  handlePrev: () => void;
  handleNext: () => void;
  scheduleTitle: string;
  backToToday: () => void;
  className?: string;
  titleClassName?: string;
}