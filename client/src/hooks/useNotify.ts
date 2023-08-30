import { useContext } from 'react'; 
import { NotifyContext } from '../hoc/NotifyContext';

export const useNotify = () => {
  const context = useContext(NotifyContext);
  if (!context) {
    throw new Error('useNotify must be used within a NotifyProvider');
  }
  return context;
};