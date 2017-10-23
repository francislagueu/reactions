import { StatusesService } from './statuses/statuses.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database-deprecated';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StatusesComponent } from './statuses/statuses.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyAOgx6jxJ0khSH9M7ItBO0ihvAFTaggTxA',
  authDomain: 'angufiredev.firebaseapp.com',
  databaseURL: 'https://angufiredev.firebaseio.com',
  projectId: 'angufiredev',
  storageBucket: 'angufiredev.appspot.com',
  messagingSenderId: '672367399024'
};

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SidebarComponent,
    StatusesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [StatusesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
