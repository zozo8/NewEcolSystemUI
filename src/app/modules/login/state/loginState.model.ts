import { Tab } from 'src/app/models/tab.model';

export interface LoginState {
  id: number;
  userName: string;
  email: string;
  token: string;
  refreshToken: string;
  departmentsId?: number[];
  tabs: Tab[];
  tokenExp: number;
  tokenUr: string;
  language: string;
}
