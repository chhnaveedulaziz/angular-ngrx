import { AppState } from '../reducers';
import { createSelector } from '@ngrx/store';

export const selectAppState = (state: AppState) => {
  return {users: []}
};

export const getUsers = createSelector(
  selectAppState,
  appStates => appStates.users
);
