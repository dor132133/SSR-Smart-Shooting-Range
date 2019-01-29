import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SessionsComponent } from './sessions/sessions.component';
import { CollectionsComponent } from './collections/collections.component';
import { ReportsComponent } from './reports/reports.component';
import { WarriorsComponent } from './warriors/warriors.component';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module'
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { EntrypointComponent } from './entrypoint/entrypoint.component';
import { SessionComponent } from './session/session.component';
import { NewSessionDialogComponent } from './new-session-dialog/new-session-dialog.component'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NewWarriorDialogComponent } from './new-warrior-dialog/new-warrior-dialog.component';
import { NewTeamDialogComponent } from './new-team-dialog/new-team-dialog.component';
import { ElementComponent } from './element/element.component';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SessionsComponent,
    CollectionsComponent,
    ReportsComponent,
    WarriorsComponent,
    NavComponent,
    EntrypointComponent,
    SessionComponent,
    NewSessionDialogComponent,
    NewWarriorDialogComponent,
    NewTeamDialogComponent,
    ElementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule ,
    DragDropModule
  ],
  entryComponents:[
    NewSessionDialogComponent,
    NewWarriorDialogComponent,
    NewTeamDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
