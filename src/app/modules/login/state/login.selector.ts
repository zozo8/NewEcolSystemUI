import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LOGIN_KEY } from './login.reducer';
import { LoginState } from './loginState';

export const getState = createFeatureSelector<LoginState>(LOGIN_KEY);

export const getToken = createSelector(getState, (state) => state.token);
export const getTokenUr = createSelector(getState, (state) => state.tokenUr);
export const getTokenExp = createSelector(getState, (state) => state.tokenExp);
export const getRefreshToken = createSelector(
  getState,
  (state) => state.refreshToken
);
export const getUserId = createSelector(getState, (state) => state.id);
export const getLanguage = createSelector(getState, (state) => state.language);
export const getLastActivity = createSelector(
  getState,
  (state) => state.lastActivity
);

export const getDepartments = createSelector(
  getState,
  (state) => state.departments
);

export const getTabs = createSelector(getState, (state) => state.tabs);
export const getActiveTab = createSelector(
  getState,
  (state) => state.activeTab
);

export const getConfigLayout = createSelector(
  getState,
  (state) => state.configLayout
);
export const getConfigComponentMode = createSelector(
  getState,
  (state) => state.configComponentMode
);

export const getConfigMenuColor = createSelector(
  getState,
  (state) => state.configMenuColor
);

export const getConfigMenuMode = createSelector(
  getState,
  (state) => state.configMenuMode
);

export const getConfigPopularMode = createSelector(
  getState,
  (state) => state.configPopularMode
);

export const getConfigScale = createSelector(
  getState,
  (state) => state.configScale
);

export const getConfigTopbarMode = createSelector(
  getState,
  (state) => state.configTopbarMode
);
