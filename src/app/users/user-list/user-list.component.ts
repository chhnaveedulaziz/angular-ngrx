import {Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatDialog } from "@angular/material/dialog";

import {AddUserComponent} from "../add-user/add-user.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {

  constructor(
      private titleService: Title,
      public dialog: MatDialog,
  ) {}

  openDialog() {
    this.dialog.open(AddUserComponent);
  }

  ngOnInit() {
    this.titleService.setTitle('angular-material-ngrx - Users');
  }

}
