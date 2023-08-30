import { IManager } from './manager';

export interface IAddManagerModalProps {
  onClose: () => void;
  onAddManager: (manager: IManager) => void;
  data?: IManager;
}