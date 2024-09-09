import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth/auth.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private flightCollection!: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
  }

  getFlights(): Observable<any[]> {
    return this.authService.getUserId().pipe(
      switchMap(userId => {
        if (userId) {
          this.flightCollection = this.afs.collection('users').doc(userId).collection('flights');
          return this.flightCollection.valueChanges({ idField: 'id' });
        } else {
          return of([]);
        }
      })
    );
  }

  addFlight(flight: any) {
    if (this.flightCollection) {
      return this.flightCollection.add(flight);
    } else {
      throw new Error('Flight collection is not initialized. Please log in.');
    }
  }

  updateFlight(flightId: string, flight: any) {
    if (this.flightCollection) {
      return this.flightCollection.doc(flightId).update(flight);
    } else {
      throw new Error('Flight collection is not initialized. Please log in.');
    }
  }

  deleteFlight(flightId: string) {
    if (this.flightCollection) {
      return this.flightCollection.doc(flightId).delete();
    } else {
      throw new Error('Flight collection is not initialized. Please log in.');
    }
  }
}
