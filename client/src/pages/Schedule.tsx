import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';

import { PageHeader } from '../components/PageHeader';
import { CustomButtonSelect } from '../components/CustomButtonSelect';
import { IHoliday } from '../types/holiday';
import { CALENDAR_MODE_OPTIONS as calendarModeOptions, CALENDAR_MODE as mode } from '../constants/selectOptions';
import { ScheduleWeek } from '../components/ScheduleWeek';
import { ScheduleMonth } from '../components/ScheduleMonth';
import { ScheduleYear } from '../components/ScheduleYear';
import { useAppDispatch } from '../hooks/reduxHook';
import { addHolidays } from '../store/slices/holydaySlice';
import { PageTitle } from '../components/PageTitle';
import { PageContent } from '../components/PageContent';
import { useGetSelectOption } from '../hooks/useGetSelectOption';
import { ROUTES } from '../constants/routes';

const Schedule: React.FC = () => {
  const dispatch = useAppDispatch();
  const { modeParam } = useParams();
  const navigate = useNavigate();

  const [calendarMode, setCalendarMode] = useState<string>(modeParam || mode.week);

  useEffect(() => {
    fetchHolidayList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCalendarMode(modeParam || '');
  }, [modeParam]);

  const fetchHolidayList = async (): Promise<void> => {
    try {
      const countryCode = 'ua';
      const year = '2023';
      const response = await axios.get<IHoliday[]>(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);

      const holidays = response && response.data ?
        response.data.map(holiday => ({
          date: holiday.date,
          localName: holiday.localName,
          name: holiday.name
        })) : [];

      const sortedHolidaysList = sortByMonth(holidays);

      dispatch(addHolidays(sortedHolidaysList));
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const sortByMonth = (holidays: IHoliday[]): Array<Array<{}> | IHoliday[]> => {
    let listOfMonths: Array<Array<{}> | IHoliday[]> = Array.from({ length: 12 }, () => []);

    holidays.forEach((holiday: IHoliday): void => {
      let month = moment(holiday.date).month();
      if (month || month === 0) {
        listOfMonths[month].push({
          date: holiday.date,
          localName: holiday.localName,
          name: holiday.name
        })
      }
    });

    return listOfMonths;
  }

  const handlerSetCalendarMode = (value: string | number) => {
    setCalendarMode(`${value}`);
    navigate(`/${ROUTES.Schedule}${value}`);
  }

  return (
    <>
      <PageTitle>Tour schedule</PageTitle>
      <PageContent>
        <>
          <PageHeader align={'right'}>
            <CustomButtonSelect
              selectValue={useGetSelectOption(calendarMode, calendarModeOptions)}
              selectOptions={calendarModeOptions}
              onChange={(option) => handlerSetCalendarMode(option.value)}
            />
          </PageHeader>
          {
            calendarMode === mode.week ?
              <ScheduleWeek /> : null
          }
          {
            calendarMode === mode.month ?
              <ScheduleMonth /> : null
          }
          {
            calendarMode === mode.year ?
              <ScheduleYear /> : null
          }
        </>
      </PageContent>
    </>
  )
};

export default Schedule;