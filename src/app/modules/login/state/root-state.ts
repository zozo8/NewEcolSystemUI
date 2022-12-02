import { LOGIN_KEY } from './login.reducer';
import { initialLoginState, LoginState } from './loginState';

export interface RootState {
  [LOGIN_KEY]: LoginState;
}

export const initialState: RootState = {
  [LOGIN_KEY]: initialLoginState,
};
