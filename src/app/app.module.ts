import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
// import { FlightDetailsComponent } from './flight-details/flight-details.component';
// import { SignupComponent } from './signup/signup.component';
// import { NavbarComponent } from './navbar/navbar.component';
// import { LoginComponent } from './login/login.component';
// import { HeroComponent } from './hero/hero.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppComponent,
    HttpClientModule,
    // FlightDetailsComponent,
    // SignupComponent,
    // NavbarComponent,
    // LoginComponent,
    // HeroComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
