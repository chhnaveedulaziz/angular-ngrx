import { createAction, props } from '@ngrx/store';
import { UserInfo } from 'src/types';

export const addUser = createAction('[USER] Add New User', props<UserInfo>());
export const hydrateUsers = createAction('[USER] Hydrate Users');
