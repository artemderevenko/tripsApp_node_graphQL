import { ReactNode } from 'react';

import { ISelect } from './select';


export interface TCustomButtonSelectProps extends ISelect {
  selectIcon?: ReactNode;
  id?: string;
}