import { ReactNode } from 'react';

export interface ISelectOption {
  optionRenderer?: ReactNode;
  value: string | number;
  label: string;
};