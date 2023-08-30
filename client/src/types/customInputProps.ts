export interface ICustomInputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder: string;
  className?: string | null;
  textError?: string;
}