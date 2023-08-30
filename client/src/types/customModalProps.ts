import { ReactNode } from 'react';

import { IButtonsList } from './buttonsList';

export interface ICustomModalProps {
  title: string;
  onClose: () => void;
  buttonsList?: IButtonsList[];
  children: ReactNode;
}