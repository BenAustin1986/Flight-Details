import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { AuthGuard } from './auth/auth.guard';
import { HeroComponent } from './hero/hero.component';

const routes: Routes = [
    { path: 'home', component: HeroComponent },
    { path: 'login', component: LoginComponent },
    { path: 'flight-details', component: FlightDetailsComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
