import { ISelectOption } from '../types/selectOption';

export const useGetSelectOption = (value: string | number, options: ISelectOption[]) => {
  if (value && options && options.length) {
    return options.filter(option => option.value === value)[0]
  }

  return null;
}