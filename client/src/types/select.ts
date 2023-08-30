import { ISelectOption } from './selectOption';

export interface ISelect {
  placeholder?: string;
  selectValue: ISelectOption | null | '' | undefined;
  selectOptions: ISelectOption[];
  positionDropDown?: string;
  onChange: (value: ISelectOption) => void;
  onBlur?: (value?:any) => void;
  className?: string;
};