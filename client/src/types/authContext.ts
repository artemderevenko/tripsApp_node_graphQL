export interface IAuthContext {
  signIn: (email: string, password: string, fromPage: string) => void;
  logOut: () => void;
}