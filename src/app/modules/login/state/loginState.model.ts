export interface LoginState {
  id: number;
  userName: string;
  email: string;
  token: string;
  refreshToken: string;
  departmentsId?: number[];
  tabs?: any[];
  tokenExp: number;
  tokenUr: string;
  language: string;
}
