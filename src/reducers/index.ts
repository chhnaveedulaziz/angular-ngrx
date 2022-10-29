import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as fromUser from './user.reducer';

export interface AppState {
  'appStates' : fromUser.UsersState;
}

export const reducers: ActionReducerMap<AppState> = {
  'appStates': fromUser.reducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
