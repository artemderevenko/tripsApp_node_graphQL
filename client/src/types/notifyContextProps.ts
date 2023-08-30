import { INotifyProps } from './notifyProps';

export interface INotifyContextProps {
  notify: INotifyProps;
  setNotify: React.Dispatch<React.SetStateAction<INotifyProps>>;
}