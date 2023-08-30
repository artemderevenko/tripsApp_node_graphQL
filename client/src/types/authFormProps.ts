export interface IAuthFormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
  buttonName: string;
  formType: string;
}