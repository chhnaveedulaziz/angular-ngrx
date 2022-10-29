import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StorageModule } from '@ngx-pwa/local-storage';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { MaterialModules } from 'src/material.module';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { reducers, metaReducers } from 'src/reducers';
import { UserEffects } from 'src/effects/user.effects';
import {ProfileComponent} from "./profile/profile.component";


@NgModule({
  declarations: [
    AppComponent,
    AddUserDialogComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    MaterialModules,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    StorageModule.forRoot({ IDBNoWrap: true }),
    EffectsModule.forRoot([UserEffects]),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }) : [],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
