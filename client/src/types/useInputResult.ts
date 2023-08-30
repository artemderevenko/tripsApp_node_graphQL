export interface IUseInputResult {
  value: string;
  name: string;
  isValid?: boolean;
  textError?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  onCheckError: () => void,
}