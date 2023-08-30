import { useState, useEffect } from 'react';

export const useSearch = ( 
  value: string,
 ) => {
  const [searchValue, setSearchValue] = useState<string>(value);

  useEffect(() => {
    setSearchValue(value)
  }, [value]);

  return searchValue;
}