import { useState, useEffect } from 'react';

export const useFilteredList = <T>(
  selectOptions: T[],
  searchValue: string,
  searchFields: string[],
): T[] => {
  const [filteredOptions, setFilteredOptions] = useState<T[]>(selectOptions);

  useEffect(() => {
    filteredSelectOptions();
  }, [selectOptions, searchValue]);

  const searchSubstring = (searchString: string, substring: string): boolean => {
    return searchString.toLowerCase().includes(substring.toLowerCase());
  };

  const filteredSelectOptions = () => {
    if (!searchValue) {
      return setFilteredOptions(selectOptions);
    }

    const result: T[] = [];
    if (selectOptions && selectOptions.length) {
      selectOptions.forEach((option: T): void => {
        if (searchFields && searchFields.length) {
          const matchesSearch = searchFields.filter(item => searchSubstring((option as any)[item], searchValue));

          if (matchesSearch && !!matchesSearch.length) {
            result.push(option);
          }
        }
      });
    }

    setFilteredOptions(result);
  };

  return filteredOptions;
};