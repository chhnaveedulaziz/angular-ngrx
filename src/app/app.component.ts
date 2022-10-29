import {Component, Directive, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import {debounceTime, distinctUntilChanged, fromEvent, Observable, of, startWith} from 'rxjs';
import { addUser, hydrateUsers } from 'src/actions/user.actions';
import { AppState } from 'src/reducers';
import { UserInfo } from 'src/types';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { StorageMap } from '@ngx-pwa/local-storage';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'NgRx Material PWA';
  users$: Observable<Array<UserInfo>>;
  masterUsers$: Observable<Array<UserInfo>>;
  hydrated$: Observable<boolean>;
  // @ts-ignore
  @ViewChild('filterInputRef') private readonly filterInput: ElementRef;

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private storage: StorageMap
  ) {
    this.users$ = this.storage.get('appState.users') as Observable<Array<UserInfo>>;
    this.masterUsers$ = this.users$;
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

  ngAfterViewInit() {
    fromEvent(this.filterInput.nativeElement, 'keyup').pipe(
      map((_event: any) => (<HTMLInputElement>_event.target).value.toLocaleLowerCase()),
      startWith(''),
      debounceTime(30),
      distinctUntilChanged(),
    ).subscribe((value: string) => {
      if (value.length === 0) {
        this.users$ = this.masterUsers$;
      } else {
        this.users$.subscribe((data) => {
          const newData = data.filter((x: { email: string; }) => x.email?.toLowerCase().indexOf(this.filterInput.nativeElement.value.toLowerCase()) !== -1,
          );
          this.users$ = of(newData)
        });
      }
    });
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
