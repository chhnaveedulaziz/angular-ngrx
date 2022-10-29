import { Action, createReducer, on } from '@ngrx/store';
import { addUser, hydrateUsers } from 'src/actions/user.actions';
import { UserInfo } from 'src/types';

export const usersStorageKey = 'users';
export interface UsersState {
  users: Array<UserInfo>;
  hydrated: boolean;
}

export const initialState: UsersState = {
  users: [],
  hydrated: false,
};

const userReducer = createReducer(
  initialState,
  on(addUser, (state, action) => {
    const {type, ...userInfo} = action;
    if(initialState.users.length === 0 || initialState.users.filter((x: UserInfo) => x.fullname === action.fullname ).length === 0)
      initialState.users.push(userInfo as UserInfo);
    return initialState;
  }),
  on(hydrateUsers, (state, action) => ({users: initialState.users, hydrated: true}))
);

export function reducer(state: UsersState | undefined, action: Action) {
  return userReducer(state, action);
}
