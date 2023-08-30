import { ISelectOption } from '../types/selectOption';

export interface IUseSelectResult {
  value: string | number
  name: string;
  isValid: boolean;
  textError: string;
  onChange: (e: ISelectOption) => void;
  onBlur: () => void;
  onCheckError: () => void,
}