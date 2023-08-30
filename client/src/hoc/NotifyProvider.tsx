import React, { useState } from 'react';

import { INotifyProps } from '../types/notifyProps';
import { NotifyContext } from './NotifyContext';
import { INotifyProviderProps } from '../types/notifyProviderProps';

export const NotifyProvider: React.FC<INotifyProviderProps> = ({ children }) => {
  const [notify, setNotify] = useState<INotifyProps>({ isActive: false, message: '', type: '' });

  return (
    <NotifyContext.Provider value={{ notify, setNotify }}>
      {children}
    </NotifyContext.Provider>
  );
};