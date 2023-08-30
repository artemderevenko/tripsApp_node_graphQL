import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useQuery } from "@apollo/client";

import styles from './TourClientsList.module.sass';
import { PageHeader } from '../PageHeader';
import { CustomButtonSearchSelect } from '../CustomButtonSearchSelect';
import { useAppDispatch, useAppdSelector } from '../../hooks/reduxHook';
import { setClients } from '../../store/slices/clientsSlice';
import { addTourist, deleteTourist, changePayment } from '../../store/slices/tourSlice';
import { IClient } from '../../types/client';
import { TOURISTS_TABLE_FIELDS as tableFields } from '../../constants/touristsTableFields';
import { useExcludedListIds } from '../../hooks/useExcludedListIds';
import { CustomModal } from '../CustomModal';
import { Table } from '../Table';
import { ISelectOption } from '../../types/selectOption';
import { MakePaymentModal } from '../MakePaymentModal';
import { ITourist } from '../../types/tourist';
import { useNotify } from '../../hooks/useNotify';
import buttonStyles from '../CustomButtonSearchSelect/CustomButtonSearchSelect.module.sass';
import { GET_CLIENTS } from '../../graphql/queries/Client';

const TourClientsList: React.FC = ({ }) => {
  const [touristsIds, setTouristsIds] = useState<string[]>([]);
  const [paymentTouristId, setPaymentTouristId] = useState<string | null>(null);
  const [deleteTouristId, setDeleteTouristId] = useState<string | null>(null);
  const { setNotify } = useNotify();

  const { data: clientsData } = useQuery(GET_CLIENTS, {
    fetchPolicy: 'no-cache',
  });
  const dispatch = useAppDispatch();
  const clients = useAppdSelector(state => state.clients.list);
  const { touristsList, seats } = useAppdSelector(state => state.tour);
  const excludedClients = useExcludedListIds(clients, touristsIds, 'id');

  useEffect(() => {
    const touristsIds = touristsList.map(tourist => tourist.clientId);
    if (!touristsIds) return;
    setTouristsIds(touristsIds);
  }, [touristsList]);

  useEffect(() => {
    getClientList();
  }, [clientsData]);

  const getClientList = async (): Promise<void> => {
    if (clientsData && clientsData.clients && clientsData.clients.length) {
      dispatch(setClients(clientsData.clients));
    } else {
      dispatch(setClients([]));
    }
  }

  const getClientOptions = (): ISelectOption[] => {
    if (excludedClients && excludedClients.length) {
      const options = excludedClients.map(client => ({
        value: client.id,
        label: `${client.firstName} ${client.lastName} ${client.middleName} (${client.passport})`
      }));

      return options;

    } else { return [] }
  }

  const addTouristToTour = (id: string) => {
    const client = clients.filter(item => item.id === id)[0] || {};
    const tourist = {
      clientId: id,
      paymentAmount: 0,
      paymentDate: '',
      seatNumber: null,
      firstName: client.firstName || '',
      lastName: client.lastName || '',
      middleName: client.middleName || '',
      passport: client.passport || '',
    };

    dispatch(addTourist(tourist));
  }

  const deleteTouristFromTour = () => {
    setDeleteTouristId(null);
    if (!deleteTouristId) {
      return setNotify({ isActive: true, message: 'Something went wrong. Please try again later.', type: 'error' })
    }
    dispatch(deleteTourist(deleteTouristId));
    setNotify({ isActive: true, message: 'Tourist deleted successfully!', type: 'success' });
  }

  const makePayment = (data: ITourist | null, paymentValue: string): void => {
    const id = paymentTouristId;
    setPaymentTouristId(null);
    if (!id) {
      return setNotify({ isActive: true, message: 'Something went wrong. Please try again later.', type: 'error' })
    }
    dispatch(changePayment({ clientId: id, payment: paymentValue, paymentDate: moment().format('DD/MM/YYYY') }))
    setNotify({ isActive: true, message: 'Payment changed successfully!', type: 'success' });
  }

  const getTouristData = () => {
    return touristsList.filter(tourist => tourist.clientId === paymentTouristId)[0] || null
  }

  const onDisableAddTouristButton = () => {
    if (seats && touristsList.length >= seats) {
      setNotify({ isActive: true, message: 'The number of tourists cannot exceed the number of seats in the selected transport.', type: 'warning' });
    }
  }

  const getTableData = () => {
    const sorteredTourists = [...touristsList].sort((a, b) => {
      if (a.seatNumber && !b.seatNumber) { return -1 }
      if (!a.seatNumber && b.seatNumber) { return 1 }
      if (a.seatNumber && b.seatNumber) {
        return a.seatNumber - b.seatNumber;
      }
      return 0;
    });

    return sorteredTourists.map(tourist => ({ ...tourist, id: tourist.clientId }));
  }

  return (
    <div className={styles['tour-clients']}>
      <PageHeader align={'between'}>
        <div className={styles['block-title']}>List of tourists</div>
        <CustomButtonSearchSelect
          label={'Add tourist'}
          selectOptions={getClientOptions()}
          onChange={(option) => addTouristToTour(`${option.value}`)}
          className={buttonStyles['long']}
          icon={<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>}
          disable={seats && touristsList.length >= seats ? true : false}
          onDisableAction={onDisableAddTouristButton}
          id="add-tourist-hide-in-pdf"
        />
      </PageHeader>
      <Table
        tableFields={tableFields}
        textNoSearch={<div>You haven`t added any tourist yet. <br /> Start by adding a tourist from your customer list.</div>}
        data={getTableData()}
        className={'tourist'}
        optionsList={(option) => ([
          {
            label: 'Make payment',
            onClick: () => setPaymentTouristId(option.id),
          },
          {
            label: 'Delete',
            className: 'delete',
            onClick: () => setDeleteTouristId(option.id),
          }
        ])}
      />
      {
        paymentTouristId ?
          <MakePaymentModal
            onClose={() => setPaymentTouristId(null)}
            onMakePayment={makePayment}
            data={getTouristData()}
          /> : null
      }
      {
        deleteTouristId ?
          <CustomModal
            title={'Delete tourist'}
            onClose={() => setDeleteTouristId(null)}
            buttonsList={[
              {
                onButtonClick: () => setDeleteTouristId(null),
                buttonText: 'Cancel',
                type: 'cancel',
              },
              {
                onButtonClick: deleteTouristFromTour,
                buttonText: 'Delete',
                type: 'delete',
              }
            ]}
          >
            <div>
              Are you sure you want to delete this tourist from the tour? <br />
              Once deleted, you can add it again.
            </div>
          </CustomModal> : null
      }
    </div>
  )
};

export { TourClientsList };