import { useState } from 'react';
import { useQuery } from "@apollo/client";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import styles from './TourSeatLayout.module.sass';
import { PageHeader } from '../PageHeader';
import { CustomButtonSelect } from '../CustomButtonSelect';
import { useGetSelectOption } from '../../hooks/useGetSelectOption';
import { SeatLayoutMinibus19 } from '../SeatLayoutMinibus19';
import { SeatLayoutBus35 } from '../SeatLayoutBus35';
import { useAppDispatch, useAppdSelector } from '../../hooks/reduxHook';
import { changeTransportType } from '../../store/slices/tourSlice';
import { ISelectOption } from '../../types/selectOption';
import { ITransport } from '../../types/transport';
import { CustomModal } from '../CustomModal';
import { IChangeTransportTypePayload } from '../../types/changeTransportTypePayload';
import { useNotify } from '../../hooks/useNotify';
import buttonStyles from '../CustomButtonSelect/CustomButtonSelect.module.sass';
import { GET_TRANSPORT } from '../../graphql/queries/Transport';

const TourSeatLayout: React.FC = ({ }) => {
  const { setNotify } = useNotify();
  const { paramsId } = useParams();

  const { data: transportData } = useQuery(GET_TRANSPORT, {
    fetchPolicy: 'no-cache',
  });

  const [showChangeTransportModal, setShowChangeTransportModal] = useState<boolean>(false);
  const [transportInfo, setTransportInfo] = useState<IChangeTransportTypePayload>({ transportId: '', seats: 0 });

  const dispatch = useAppDispatch();
  const { transportId, touristsList } = useAppdSelector(state => state.tour);

  useEffect(() => {
    if (!paramsId) {
      setDefaultTransport();
    }
  }, [transportData]);

  const setDefaultTransport = () => {
    if (transportData && transportData.transport && transportData.transport.length) {
      dispatch(changeTransportType({
        transportId: transportData.transport[0].id,
        seats: transportData.transport[0].seats,
      }));
    }
  }

  const getSeatLayoutBox = () => {
    const type = getTransportType(transportId);

    switch (type) {
      case 'minibus_19':
        return <SeatLayoutMinibus19 />;

      case 'bus_35':
        return <SeatLayoutBus35 />;

      default:
        return null
    }
  }

  const confirmTransportChange = () => {
    dispatch(changeTransportType(transportInfo));
    setTransportInfo({ transportId: '', seats: 0 });
    setShowChangeTransportModal(false);
    setNotify({ isActive: true, message: 'Transport type changed successfully!', type: 'success' });
  }

  const handlerChangeTransportType = (option: ISelectOption): void => {
    const optionValue = `${option.value}`;
    const seats = getSeats(optionValue);
    if (transportId === optionValue) return;

    if (touristsList.length > seats) {
      return setNotify({ isActive: true, type: 'warning', message: 'The number of seats of the selected transport is less than the number of tourists.' });
    }

    setTransportInfo({ transportId: optionValue, seats: seats });
    setShowChangeTransportModal(true);
  }

  const cancelTransportChange = () => {
    setTransportInfo({ transportId: '', seats: 0 });
    setShowChangeTransportModal(false);
  }

  const getTransportOptions = (): ISelectOption[] => {
    return transportData && transportData.transport && transportData.transport.length ?
      transportData.transport.map((item: ITransport): ISelectOption => ({
        value: item.id,
        label: item.name,
      }))
      : []
  }

  const getSeats = (id: string): number => {
    return transportData && transportData.transport && transportData.transport.length ?
      transportData.transport.filter((item: ITransport) => item.id === id)[0]?.seats
      : null
  }

  const getTransportType = (id: string): string => {
    return transportData && transportData.transport && transportData.transport.length ?
      transportData.transport.filter((item: ITransport) => item.id === id)[0]?.type
      : ''
  }

  return (
    <div className={styles['seat-layout']}>
      <PageHeader align={'between'}>
        <div className={styles['block-title']}>Passenger Seating Plan</div>
        <CustomButtonSelect
          selectValue={useGetSelectOption(transportId, getTransportOptions())}
          selectOptions={getTransportOptions()}
          onChange={handlerChangeTransportType}
          className={buttonStyles['long']}
          id="transport-hide-in-pdf"
        />
      </PageHeader>
      <div className={styles['seat-layout-box']}>
        {getSeatLayoutBox()}
      </div>
      {
        showChangeTransportModal ?
          <CustomModal
            title={'Confirm transport change'}
            onClose={cancelTransportChange}
            buttonsList={[
              {
                onButtonClick: cancelTransportChange,
                buttonText: 'Cancel',
                type: 'cancel',
              },
              {
                onButtonClick: confirmTransportChange,
                buttonText: 'Confirm',
                type: 'confirm',
              }
            ]}
          >
            <div>
              Once the mode of transport is changed, the previous <br />
              seating chart will be cleared.
            </div>
          </CustomModal> : null
      }
    </div>
  )
};

export { TourSeatLayout };