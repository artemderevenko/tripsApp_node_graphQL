export interface ITourist {
  clientId: string;
  paymentAmount: number | null;
  paymentDate: string;
  seatNumber: number | null;
  firstName: string;
  lastName: string;
  middleName: string;
  passport: string;
};