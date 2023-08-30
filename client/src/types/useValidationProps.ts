import { IValidations } from '../types/validations';

export interface IUseValidationProps {
  initialValue: string;
  name: string;
  validations: IValidations;
  checkError: boolean;
}