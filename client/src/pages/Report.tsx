import { useEffect, useState } from 'react';
import { useQuery } from "@apollo/client";

import { PageTitle } from '../components/PageTitle';
import { PageContent } from '../components/PageContent';
import { NoResults } from '../components/NoResults';
import { PageHeader } from '../components/PageHeader';
import { CustomButtonSelect } from '../components/CustomButtonSelect';
import { useGetSelectOption } from '../hooks/useGetSelectOption';
import { ITour } from '../types/tour';
import buttonStyles from '../components/CustomButtonSelect/CustomButtonSelect.module.sass';
import headerStyles from '../components/PageHeader/PageHeader.module.sass';
import { ReportExpensesPieChart } from '../components/ReportExpensesPieChart';
import { ReportIncomeExpenseChart } from '../components/ReportIncomeExpenseChart';
import { PageLoader } from '../components/PageLoader';
import { ISelectOption } from '../types/selectOption';
import { GET_TOURS, GET_TOUR } from '../graphql/queries/Tour';

const Report: React.FC = () => {
  const [selectedTourId, setSelectedTourId] = useState<string | null>(null);
  const [fadeAnimation, setFadeAnimation] = useState<boolean>(true);

  const { loading, data: toursData } = useQuery(GET_TOURS, {
    fetchPolicy: 'no-cache',
  });
  const { data: tourData } = useQuery(GET_TOUR, {
    variables: { id: selectedTourId },
    skip: !selectedTourId,
    fetchPolicy: 'no-cache',
  });

  const tours: ITour[] = toursData && toursData.tours && toursData.tours.length ? toursData.tours : [];
  const tour: ITour = tourData && tourData.tour ? tourData.tour : null;

  useEffect(() => {
    if (!selectedTourId && tours && tours.length) {
      setSelectedTourId(tours[0].id)
    }
  }, [tours]);

  const getTourOptions = (): ISelectOption[] => {
    if (tours && tours.length) {
      const options = tours
        .map(tour => ({
          value: tour.id || '',
          label: tour.name
        }))
        .filter(item => item.value);

      return options;

    } else { return [] }
  }

  const changeTourReport = (id: string | number) => {
    if (selectedTourId && selectedTourId !== id) {
      setFadeAnimation(true);

      setTimeout(() => {
        setFadeAnimation(false)
      }, 300)
    }

    setSelectedTourId(tours.filter(item => item.id === id)[0]?.id || null);
  }

  const tourOptions = getTourOptions();
  const tourValue = useGetSelectOption(selectedTourId || '', tourOptions);

  return (
    <>
      <PageTitle>Tour Report</PageTitle>
      <PageContent>
        <>
          <PageHeader align={'between'}>
            {
              !loading && tours && tours.length ?

                <div className={`${fadeAnimation ? headerStyles['fade'] : ''} ${headerStyles['title']}`}>
                  {tour && tour.name ? tour.name : ''}
                </div> : null
            }
            {
              !loading && tours && tours.length ?
                <CustomButtonSelect
                  selectValue={tourValue}
                  selectOptions={tourOptions}
                  onChange={(option) => changeTourReport(option.value)}
                  className={buttonStyles['long']}
                /> : null
            }
          </PageHeader>
          {
            loading ? <PageLoader /> : null
          }
          {
            !loading && (!tours || !tours.length) ?
              <NoResults
                text={<div>You haven't added any tours yet. <br /> You will be able to view the report once you add at least one tour.</div>}
              /> : null
          }
          {
            !loading && tours && tours.length ?
              <>
                <ReportExpensesPieChart expenses={tour ? tour.expenses : []} />
                <ReportIncomeExpenseChart tour={tour || null} />
              </> : null
          }
        </>
      </PageContent>
    </>
  )
};

export default Report;
