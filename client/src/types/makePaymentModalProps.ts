import { ITourist } from './tourist';

export interface IMakePaymentModalProps {
  onClose: () => void,
  onMakePayment: (data: ITourist | null, value: string) => void,
  data: ITourist | null
}