import { useState, useEffect } from 'react';
import moment from 'moment';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from "@apollo/client";

import styles from './ScheduleWeek.module.sass';
import stylesWeekRow from '../ScheduleWeekRow/ScheduleWeekRow.module.sass';
import stylesPagination from '../ScheduleDaysPagination/ScheduleDaysPagination.module.sass';
import { ScheduleDaysPagination } from '../ScheduleDaysPagination';
import { ScheduleDaysHeader } from '../ScheduleDaysHeader';
import { setTours } from '../../store/slices/toursSlice';
import { useAppdSelector, useAppDispatch } from '../../hooks/reduxHook';
import { ScheduleWeekRow } from '../ScheduleWeekRow';
import { ROUTES } from '../../constants/routes';
import { GET_TOURS_IN_DATE_RANGE } from '../../graphql/queries/Tour';

const ScheduleWeek: React.FC = () => {
  const dispatch = useAppDispatch();

  const [daysWeek, setDaysWeek] = useState<moment.Moment[]>([]);
  const [scrollDirection, setScrollDirection] = useState<string>('');
  const [fadeAnimation, setFadeAnimation] = useState<boolean>(true);
  const [scheduleTitle, setScheduleTitle] = useState<string>('');

  const { data: toursData } = useQuery(GET_TOURS_IN_DATE_RANGE, {
    variables: {
      startDate: daysWeek && daysWeek.length ? daysWeek[0].format('DD/MM/YYYY') : '',
      endDate: daysWeek && daysWeek.length ? daysWeek[daysWeek.length - 1].format('DD/MM/YYYY') : ''
    },
    skip: !daysWeek || !daysWeek.length,
    fetchPolicy: 'no-cache',
  });

  const tours = useAppdSelector(state => state.tours.list);
  const { modeParam } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const dateParam = params.get('date');

  useEffect(() => {
    getStartDaysWeek(dateParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, []);

  useEffect(() => {
    getTourList();
  }, [toursData]);

  const handleScrollDirection = (direction: string, daysList: moment.Moment[]) => {
    setScrollDirection(direction);

    setTimeout(() => {
      setScrollDirection('');
      getScheduleTitle(daysList);
      setDaysWeek(daysList);
    }, 180);
  };

  const getScheduleTitle = (daysList: moment.Moment[]): void => {
    const firstDay = daysList[0];
    const lastDay = daysList[daysList.length - 1];
    const yearFirstDay = firstDay.year();
    const fullMonthFirstDay = firstDay.format('MMMM');
    const yearLastDay = lastDay.year();
    const fullMonthLastDay = lastDay.format('MMMM');
    let scheduleTitle = `${fullMonthFirstDay} ${yearFirstDay}`;

    if (yearFirstDay === yearLastDay && fullMonthFirstDay !== fullMonthLastDay) {
      scheduleTitle = `${firstDay.format('MMM')} - ${lastDay.format('MMM')} ${yearFirstDay}`
    }

    if (yearFirstDay !== yearLastDay && fullMonthFirstDay !== fullMonthLastDay) {
      scheduleTitle = `${firstDay.format('MMM')} ${yearFirstDay} - ${lastDay.format('MMM')} ${yearLastDay}`
    }

    setScheduleTitle(scheduleTitle);
  }

  const getStartDaysWeek = (date?: string | null): void => {
    const currentDate = date ? moment(date, 'DD/MM/YYYY', true) : moment();
    const currentDateDay = currentDate.day();
    const getFirstDayWeek = currentDate.startOf('week').add(currentDateDay === 0 ? -6 : 1, 'day');
    const daysList = Array.from({ length: 7 }, (_, index) => {
      const copyFirstDay = getFirstDayWeek.clone();
      return moment(copyFirstDay).add(index, 'day');
    })

    setDaysWeek(daysList);
    getScheduleTitle(daysList);
    setFadeAnimation(true);

    setTimeout(() => {
      setFadeAnimation(false)
    }, 300);
  }

  const getTourList = () => {
    if (toursData && toursData.tours && toursData.tours.length) {
      dispatch(setTours(toursData.tours));
    } else {
      dispatch(setTours([]));
    }
  }

  const handlePrev = (): void => {
    const daysList = Array.from({ length: 7 }, (_, index) => {
      const copyFirstDay = daysWeek[0].clone();
      return moment(copyFirstDay).add(index - 7, 'day');
    });

    const dateString = daysList[0].format('DD/MM/YYYY');
    handleScrollDirection('right', daysList);
    navigate(`/${ROUTES.Schedule}${modeParam}?date=${encodeURIComponent(dateString)}`);
  }

  const handleNext = (): void => {
    const daysList = Array.from({ length: 7 }, (_, index) => {
      const copyFirstDay = daysWeek[daysWeek.length - 1].clone();
      return moment(copyFirstDay).add(index + 1, 'day');
    });
    const dateString = daysList[0].format('DD/MM/YYYY');
    handleScrollDirection('left', daysList);
    navigate(`/${ROUTES.Schedule}${modeParam}?date=${encodeURIComponent(dateString)}`);
  }

  const getScrollClass = (): string => {
    return `${scrollDirection === 'right' ? stylesWeekRow['scroll-right'] : ''} ${scrollDirection === 'left' ? stylesWeekRow['scroll-left'] : ''} ${fadeAnimation ? stylesWeekRow['fade'] : ''}`
  }

  const backToToday = (): void => {
    getStartDaysWeek();
    navigate(`/${ROUTES.Schedule}${modeParam}`);
  }

  return (
    <div className={styles['schedule-week']}>
      <ScheduleDaysPagination
        handlePrev={handlePrev}
        handleNext={handleNext}
        scheduleTitle={scheduleTitle}
        backToToday={backToToday}
        titleClassName={`${fadeAnimation ? stylesPagination['fade'] : ''}`}
      />
      {
        daysWeek && daysWeek.length ?
          <div className={styles['schedule-week-wrap']}>
            <ScheduleDaysHeader mode={'week'} />
            <ScheduleWeekRow
              tours={tours}
              daysWeek={daysWeek}
              className={getScrollClass()}
            />
          </div> : null
      }
    </div>
  )
};

export { ScheduleWeek };