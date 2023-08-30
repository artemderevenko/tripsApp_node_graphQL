import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from "@apollo/client";

import { PageTitle } from '../components/PageTitle';
import { PageContent } from '../components/PageContent';
import { TourInfo } from '../components/TourInfo';
import { TourSeatLayout } from '../components/TourSeatLayout';
import { useAppDispatch } from '../hooks/reduxHook';
import { resetToDefault, setTour } from '../store/slices/tourSlice';
import { TourClientsList } from '../components/TourClientsList';
import { TourExpenses } from '../components/TourExpenses';
import { GET_TOUR } from '../graphql/queries/Tour';

const TourDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { paramsId} = useParams();
  const { data: tourData } = useQuery(GET_TOUR, {
    variables: { id: paramsId },
    skip: !paramsId,
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    const resetTour = () => {
      dispatch(resetToDefault())
    };

    if (paramsId) {
      getTour();
    }

    return resetTour;
  }, [tourData]);

  const getTour = () => { 
    if (tourData && tourData.tour) {
      dispatch(setTour(tourData.tour));
    } 
  }

  return (
    <>
      <PageTitle>{paramsId ? 'Tour Details' : 'Add new tour'}</PageTitle>
      <PageContent>
        <div id='tour-info-pdf'>
          <TourInfo />
          <TourExpenses />
          <TourClientsList />
          <TourSeatLayout />
        </div>
      </PageContent>
    </>
  )
};

export default TourDetails;
