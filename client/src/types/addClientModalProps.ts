import { IClient } from './client';

export interface IAddClientModalProps {
  onClose: () => void;
  onAddClient: (client: IClient) => void;
  data?: IClient;
}