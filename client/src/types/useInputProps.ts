import { IValidations } from '../types/validations';

export interface IUseInputProps {
  initialValue: string;
  name: string;
  validations?: IValidations;
}