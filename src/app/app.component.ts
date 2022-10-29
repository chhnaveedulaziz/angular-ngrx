import { Component, Directive, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addUser, hydrateUsers } from 'src/actions/user.actions';
import { AppState } from 'src/reducers';
import { UserInfo } from 'src/types';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { StorageMap } from '@ngx-pwa/local-storage';
import { getUsers } from 'src/selectors/user.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'NgRx Material PWA';
  longText: string = 'Some random text will go here';
  users$: Observable<Array<UserInfo>>;
  hydrated$: Observable<boolean>;

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private storage: StorageMap
  ) {
    this.users$ = this.storage.get('appState.users') as Observable<Array<UserInfo>>;
    this.hydrated$ = this.storage.get('appState.hydrated') as Observable<boolean>;
  }
  ngOnInit(): void {
    this.hydrated$.subscribe(isHydrated => {
      if(!!isHydrated)
      this.users$.subscribe((data: UserInfo[]) => {
        console.log(data);
      });

    })
  }

  openAddUserDialog(_event: Event) {
    const addUserDialog = this.dialog.open(AddUserDialogComponent);
    addUserDialog.afterClosed().subscribe((values: FormGroup) => {
      this.store.dispatch(addUser(values.value));
      this.users$ = this.storage.get('appState.users') as Observable<Array<UserInfo>>;
      // this.users$ = this.store.pipe(select(getUsers));
    });
  }
}
