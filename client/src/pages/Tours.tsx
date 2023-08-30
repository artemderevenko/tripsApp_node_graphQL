import { useState, useEffect } from 'react';
import { useQuery, useMutation } from "@apollo/client";

import { PageHeader } from '../components/PageHeader';
import { CustomSearchField } from '../components/CustomSearchField';
import { TOURS_TABLE_FIELDS as tableFields } from '../constants/toursTableFields';
import { CustomButton } from '../components/CustomButton';
import { useAppdSelector, useAppDispatch } from '../hooks/reduxHook';
import { setTours } from '../store/slices/toursSlice';
import { CustomModal } from '../components/CustomModal';
import { ROUTES } from '../constants/routes';
import { PageTitle } from '../components/PageTitle';
import { PageContent } from '../components/PageContent';
import { useFilteredList } from '../hooks/useFilteredList';
import { Table } from '../components/Table';
import { useNotify } from '../hooks/useNotify';
import { GET_TOURS } from '../graphql/queries/Tour';
import { DELETE_TOUR } from '../graphql/mutations/Tour';

const Tours: React.FC = () => {
  const { loading, data: toursData } = useQuery(GET_TOURS, {
    fetchPolicy: 'no-cache',
  });
  const [deleteTour] = useMutation(DELETE_TOUR);
  const [deleteTourId, setDeleteTourId] = useState<string | null>(null);
  const [activeSearchValue, setActiveSearchValue] = useState<string>('');

  const dispatch = useAppDispatch();
  const tours = useAppdSelector(state => state.tours.list);
  const filteredTours = useFilteredList(tours, activeSearchValue, ['name', 'location']);
  const { setNotify } = useNotify();

  useEffect(() => {
    getTourList()
  }, [toursData]);

  const getTourList = () => {
    if (toursData && toursData.tours && toursData.tours.length) {
      dispatch(setTours(toursData.tours));
    } else {
      dispatch(setTours([]));
    }
  }

  const removeTour = (): void => {
    deleteTour({
      variables: { id: deleteTourId }
    })
      .then((response) => {
        if (!response.errors && response.data && response.data.deleteTour && response.data.deleteTour.successful) {

          const updatedClients = tours.filter(item => item.id !== deleteTourId);

          dispatch(setTours(updatedClients));
          setNotify({ isActive: true, type: 'success', message: 'Tour deleted successfully!' });
        } else {
          setNotify({ isActive: true, type: 'error', message: 'Something went wrong. Please try again later.' });
        }
      })
      .catch((error) => {
        setNotify({ isActive: true, type: 'error', message: 'Something went wrong. Please try again later.' });
      });

      setDeleteTourId(null);
  }

  const onSearch = (value: string): void => {
    setActiveSearchValue(value)
  }

  const textNoSearch = activeSearchValue ?
    'No tours found. Try another search criteria.' :
    <div>You haven`t created any tour yet. <br /> Start with adding a new tour.</div>;

  return (
    <>
      <PageTitle>Tours</PageTitle>
      <PageContent>
        <>
          <PageHeader align={'between'}>
            <>
              <CustomButton
                onClick={() => null}
                buttonText={'Add new tour'}
                type={'confirm'}
                disable={loading}
                icon={<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                </svg>}
                linkPath={`/${ROUTES.TourNew}`}
              />
              <CustomSearchField
                placeholder={'Search by tour name or location'}
                disable={loading || ((!filteredTours || !filteredTours.length) && !activeSearchValue)}
                onSearch={onSearch}
              />
            </>
          </PageHeader>
          <Table
            tableFields={tableFields}
            isFetching={loading}
            textNoSearch={textNoSearch}
            data={filteredTours}
            className={'tours'}
            optionsList={(option) => ([
              {
                label: 'Edit',
                linkPath: `/${ROUTES.TourDetails}${option.id}`
              },
              {
                label: 'Delete',
                className: 'delete',
                onClick: () => setDeleteTourId(option && option.id ? option.id : null),
              }
            ])}
          />
          {
            deleteTourId ?
              <CustomModal
                title={'Delete tour'}
                onClose={() => setDeleteTourId(null)}
                buttonsList={[
                  {
                    onButtonClick: () => setDeleteTourId(null),
                    buttonText: 'Cancel',
                    type: 'cancel',
                  },
                  {
                    onButtonClick: removeTour,
                    buttonText: 'Delete',
                    type: 'delete',
                  }
                ]}
              >
                <div>After you delete a tour, it's permanently deleted.</div>
              </CustomModal> : null
          }
        </>
      </PageContent>
    </>
  )
};

export default Tours;