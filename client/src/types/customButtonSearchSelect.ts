import { ReactNode } from 'react';

import { ISelectOption } from './selectOption';

export interface TCustomButtonSearchSelectProps {
  selectOptions: ISelectOption[];
  positionDropDown?: string;
  onChange: (value: ISelectOption) => void;
  onBlur?: (value?:any) => void;
  onDisableAction?: () => void;
  className?: string;
  icon?: ReactNode;
  label: string;
  disable?: boolean;
  id?: string
};