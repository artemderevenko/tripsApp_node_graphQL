import { ISelectOption } from './selectOption';

export interface ISeatLayoutButtonProps {
  label: string;
  selectOptions: ISelectOption[];
  positionDropDown?: string;
  onChange: (value: ISelectOption) => void;
  className?: string;
  isSeatReserved?: boolean;
}