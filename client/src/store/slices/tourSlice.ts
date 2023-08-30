import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ITour } from '../../types/tour';
import { ITourist } from '../../types/tourist';
import { IChangeInfoPayload } from '../../types/changeInfoPayload';
import { IPaymentPayload } from '../../types/paymentPayload';
import { IChangeTransportTypePayload } from '../../types/changeTransportTypePayload';
import { IChangeSeatPayload } from '../../types/changeSeatPayload';

const initialState: ITour = {
  id: `${Math.floor(Date.now() / 1000)}`,
  name: '',
  description: '',
  startDate: '',
  endDate: '',
  location: '',
  cost: null,
  managerId: '',
  insurance: '',
  transportId: '',
  seats: null,
  touristsList: [],
  color: null,
  expenses: [],
}

const tourSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {
    setTour: (state, actions: PayloadAction<ITour>) => {
      return { ...state, ...actions.payload }
    },
    changeTourInfo: (state, actions: PayloadAction<IChangeInfoPayload>) => {
      const { fieldName, value } = actions.payload;
      if (Object.prototype.hasOwnProperty.call(state, fieldName)) {
        state[fieldName] = value;
      }
    },
    changeTransportType: (state, actions: PayloadAction<IChangeTransportTypePayload>) => { 
      state.transportId = actions.payload.transportId;
      state.seats = actions.payload.seats;
      state.touristsList = state.touristsList.map(tourist => ({...tourist, seatNumber: null}));
    },
    resetToDefault: () => {
      return initialState
    },
    addTourist: (state, actions: PayloadAction<ITourist>) => {
      state.touristsList = [
        ...state.touristsList,
        actions.payload
      ]
    },
    deleteTourist: (state, actions: PayloadAction<string>) => {
      state.touristsList = state.touristsList.filter(tourist => tourist.clientId !== actions.payload);
    },
    changePayment: (state, actions: PayloadAction<IPaymentPayload>) => {
      state.touristsList = state.touristsList.map(tourist => {
        if (tourist.clientId === actions.payload.clientId) {
          return { 
            ...tourist, 
            paymentAmount: Number(actions.payload.payment),
            paymentDate: actions.payload.paymentDate,
          }
        } else { return tourist}
      });
    },
    changeSeatNumber: (state, actions: PayloadAction<IChangeSeatPayload>) => {
      // delete the selected seat if it was already there
      let touristsList = state.touristsList.map(tourist => {
        if (tourist.seatNumber === actions.payload.seatNumber) {
          return { ...tourist, seatNumber: null}
        } else { return tourist}
      });

      // if there is a tourist id, then we set the selected seat for him
      if (actions.payload.clientId) {
        touristsList = touristsList.map(tourist => {
          if (tourist.clientId === actions.payload.clientId) {
            return { ...tourist, seatNumber: actions.payload.seatNumber}
          } else { return tourist}
        });
      };

      state.touristsList = touristsList;
    },
  },
});

export const { 
  setTour, 
  changeTourInfo, 
  resetToDefault, 
  addTourist, 
  deleteTourist, 
  changePayment,
  changeTransportType,
  changeSeatNumber, 
} = tourSlice.actions;
export default tourSlice.reducer;