import { useState, useEffect } from 'react';

import { useValidation } from './useValidation';
import { IUseInputProps } from '../types/useInputProps';
import { IUseInputResult } from '../types/useInputResult';

export const useInput = ({
  initialValue,
  name,
  validations={},
}: IUseInputProps): IUseInputResult => {
  const [value, setValue] = useState<string>(initialValue);
  const [checkError, setCheckError] = useState<boolean>(false);

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue]);

  const validation = useValidation({ 
    initialValue: value, 
    name, 
    validations,
    checkError, 
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (checkError) { setCheckError(false) }
    setValue(e.target.value);
  }

  const onBlur = () => {
    setCheckError(true)
  }

  const onCheckError = () => {
    setCheckError(true)
  }

  return {
    value,
    name,
    onChange,
    onBlur,
    onCheckError,
    ...validation,
  };
};