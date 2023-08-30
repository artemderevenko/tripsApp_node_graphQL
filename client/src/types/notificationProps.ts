export interface INotificationProps {
  message: string;
  type: string;
  afterHide: () => void;
}