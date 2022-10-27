import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {AddUserComponent} from "./add-user/add-user.component";
import {ProfileComponent} from "./profile/profile.component";
import {UserTabComponent} from "./user-tab/user-tab.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule
  ],
  declarations: [UserListComponent, AddUserComponent, ProfileComponent, UserTabComponent]
})
export class UsersModule { }
