
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { ReportsComponent } from "./reports/reports.component";
import { CollectionsComponent } from "./collections/collections.component";
import { SessionsComponent } from "./sessions/sessions.component";
import { WarriorsComponent } from "./warriors/warriors.component";

const routes : Routes = [
{ path: "home", component: HomeComponent },
{ path: "reports", component: ReportsComponent },
{ path: "collections", component: CollectionsComponent },
{ path: "sessions", component: SessionsComponent },
{ path: '', redirectTo: '/home', pathMatch: 'full' }//default
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled', //enableTracing: true - dubuggin only
    })
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
