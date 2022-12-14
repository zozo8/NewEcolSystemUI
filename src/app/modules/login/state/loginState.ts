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
  activeTab: number;
  configLayout: string;
  configScale: number;
  configMenuMode: string;
  configPopularMode: string;
  configMenuColor: string;
  configTopbarMode: string;
  configComponentMode: string;
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
  activeTab: 0,
  configLayout: 'light',
  configScale: 14,
  configMenuMode: 'static',
  configPopularMode: 'bottom',
  configMenuColor: 'light',
  configTopbarMode: 'blue',
  configComponentMode: 'filled',
};
