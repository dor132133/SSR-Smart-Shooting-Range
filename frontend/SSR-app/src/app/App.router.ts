
import { Routes } from "@angular/core"
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { AboutComponent } from "./about/about.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { ContactAsComponent } from "./contact-as/contact-as.component";

const appRoutes: Routes = [
{ path: "home", component: HomeComponent },
{ path: "profile", component: ProfileComponent },
{ path: "about", component: AboutComponent },
{ path: "gallery", component: GalleryComponent },
{ path: "contact-as", component: ContactAsComponent },
{ path: '', redirectTo: '/home', pathMatch: 'full' }
];