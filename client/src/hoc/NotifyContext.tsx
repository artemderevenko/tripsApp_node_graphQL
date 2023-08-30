import React from 'react';

import { INotifyContextProps } from '../types/notifyContextProps';

export const NotifyContext = React.createContext<INotifyContextProps>({
  notify: { isActive: false, message: '', type: '' },
  setNotify: () => {},
});
