import { useState, useEffect } from 'react';

import { ISelectOption } from '../types/selectOption';
import { IUseSelectProps } from '../types/useSelectProps';
import { IUseSelectResult } from '../types/useSelectResult';

export const useSelect = ({
  initialValue,
  name,
}: IUseSelectProps): IUseSelectResult => {
  const [value, setValue] = useState<string | number>(initialValue);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [textError, setTextError] = useState<string>('');

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue]);

  const onChange = (e: ISelectOption): void => {
    setValue(e.value);
    
    if (e.value) {
      setTextError('');
      setIsValid(true);
    }
  }

  const onBlur = () => {
    onCheckError()
  }

  const onCheckError = () => {
    if (!value) {
      setTextError(`${name} required`);
      setIsValid(false);
    } else {
      setTextError('');
      setIsValid(true);
    }
  }

  return {
    value,
    name,
    onChange,
    onBlur,
    onCheckError,
    isValid,
    textError,
  };
};