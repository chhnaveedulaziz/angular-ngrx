import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { StorageMap } from '@ngx-pwa/local-storage';
import { addUser, hydrateUsers } from 'src/actions/user.actions';
import { UserInfo } from 'src/types';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private storage: StorageMap) {}

  setUsers$ = createEffect(
    () => {
      console.log('========== Add User Effect ==========');
      return this.actions$.pipe(
        ofType(addUser),
        map(async (action) => {
          this.storage.get('appState.users').subscribe((data: any) => {
            console.log(data);
            if(!data){
              this.storage.set('appState.users', [action]).subscribe();

              return;
            }
            if(data.filter((x: UserInfo) => x.fullname === action.fullname ).length === 0)
              this.storage.set('appState.users', [...data, action]).subscribe();
          });
        })
      );
    },
    { dispatch: false }
  );

  setHydrated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(hydrateUsers),
      tap( () => {this.storage.set('appState.hydrated', true).subscribe()})
    ), {dispatch: false}
  );
}
