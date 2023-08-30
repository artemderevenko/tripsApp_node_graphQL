import { useState, useEffect } from 'react';

export const useExcludedListIds = <T, K extends keyof T>( 
  list: T[],
  excludedIds: string[],
  fieldName: K,
 ): T[] => {
  const [excludedList, setExcludedList] = useState<T[]>(list);

  useEffect(() => {
    const filteredList = list.filter(option => !excludedIds.includes(option[fieldName] as unknown as string));
    setExcludedList(filteredList);
  }, [list, excludedIds, fieldName]);

  return excludedList;
}