import { ReactNode } from 'react';

import { ITableFields } from './tableFields';
import { ITableRowOption } from './tableRowOptions';
import { IDataProps } from '../types/dataProps';

export interface ITableProps {
  tableFields: ITableFields[];
  isFetching?: boolean;
  textNoSearch: string | ReactNode;
  data: IDataProps[];
  optionsList?: (data: IDataProps) => ITableRowOption[];
  className?: string;
}