import { ReactNode } from 'react';

export interface ICustomButtonProps {
  buttonText: string;
  onClick: () => void;
  type: string;
  className?: string | null;
  disable?: boolean;
  icon?: ReactNode;
  linkPath?: string;
  id?: string;
}