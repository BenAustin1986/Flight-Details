import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { initializeApp, getApps } from 'firebase/app';

// bootstrapApplication(AppComponent)
//   .catch(err => console.error(err));

if (!getApps().length) {
  initializeApp(environment.firebaseConfig);
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
