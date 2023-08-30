import { ISelectOption } from './selectOption';

export interface IDropdownOptionsProps {
  positionDropDown?: string;
  options: ISelectOption[];
  changeOption: (value: ISelectOption) => void;
  checkSelectedClass?: (option: ISelectOption) => boolean;
  className?: string;
}