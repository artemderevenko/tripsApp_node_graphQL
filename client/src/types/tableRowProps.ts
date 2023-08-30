import { ReactNode, } from 'react';

import { ITableRowOption } from './tableRowOptions';

export interface ITableRowProps {
  children: ReactNode;
  optionsList?: ITableRowOption[];
}