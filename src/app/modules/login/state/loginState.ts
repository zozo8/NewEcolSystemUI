export interface LoginState {
  id: number;
  userName: string;
  email: string;
  token: string;
  refreshToken: string;
  departments: number[];
  tabs: string[];
  tokenExp: number;
  tokenUr: string;
  language: string;
  lastActivity: number;
  layout: string;
}

export const initialLoginState: LoginState = {
  email: '',
  id: 0,
  refreshToken: '',
  departments: [],
  tabs: [],
  token: '',
  userName: '',
  tokenExp: 0,
  tokenUr: '',
  language: 'pl',
  lastActivity: 0,
  layout: 'light',
};
