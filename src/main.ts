import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from './environments/environment';
import { HeroComponent } from './app/hero/hero.component';
import { FlightDetailsComponent } from './app/flight-details/flight-details.component';
import { AuthGuard } from './app/auth/auth.guard';
import { LoginComponent } from './app/login/login.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '/', component: HeroComponent },
      { path: 'login', component: LoginComponent },
      { path: 'flight-details', component: FlightDetailsComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: '**', redirectTo: '/login' }
    ]),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth())
  ]
}).catch(err => console.error(err));
