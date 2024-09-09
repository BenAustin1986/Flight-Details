import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loggedInStatus = new BehaviorSubject<boolean>(false);
    private currentUserId: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

    constructor(private afAuth: AngularFireAuth) {
        this.setPersistence();

        // Subscribe to authentication state changes and extract the user ID
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.currentUserId.next(user.uid);
                this.loggedInStatus.next(true);
            } else {
                this.currentUserId.next(null);
                this.loggedInStatus.next(false);
            }
        });
    }

    // Keep persistence setting for Firebase auth
    async setPersistence() {
        try {
            if (typeof window !== 'undefined') {
                await this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            }
        } catch (error) {
            console.error('Error setting persistence:', error);
        }
    }

    // Sign up a new user
    signup(email: string, password: string): Promise<any> {
        return this.afAuth.createUserWithEmailAndPassword(email, password)
            .then((result: any) => {
                console.log('User signed up successfully:', result);
                return result;
            })
            .catch(error => {
                console.error('Signup failed:', error);
                throw error;
            });
    }

    // Log in an existing user
    login(email: string, password: string): Promise<any> {
        return this.afAuth.signInWithEmailAndPassword(email, password)
            .then(result => {
                console.log('User logged in successfully:', result);
                return result;
            })
            .catch(error => {
                console.error('Login failed:', error);
                throw error;
            });
    }

    // Return an observable of the user's login status
    isLoggedIn(): Observable<boolean> {
        return this.loggedInStatus.asObservable();
    }

    // Return an observable with the current user's ID
    getUserId(): Observable<string | null> {
        return this.currentUserId.asObservable();
    }

    // Log out the current user
    logout() {
        return this.afAuth.signOut();
    }
}



// import { Injectable } from '@angular/core';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import firebase from 'firebase/compat/app';

// @Injectable({
//     providedIn: 'root'
// })

// export class FlightService {
//     private flightCollection: AngularFirestoreCollection<any>;

//     constructor(private afs: AngularFirestore, private authService: AuthService) {
//         this.authService.isLoggedIn().subscribe(user => {
//             if (user) {
//                 this.flightCollection = this.afs.collection('users').doc(user.uid).collection('flights');
//             }
//         });
//     }

//     getFlights(): Observable<any[]> {
//         return this.flightCollection.valueChanges();
//     }

//     addFlight(flight: any) {
//         return this.flightCollection.add(flight);
//     }

//     deleteFlight(flightId: string) {
//         return this.flightCollection.doc(flightId).delete();
//     }
// }

// export class AuthService {
//     private loggedInStatus = new BehaviorSubject<boolean>(false);

//     constructor(private afAuth: AngularFireAuth) {
//         this.setPersistence();
//     }

//     async setPersistence() {
//         try {
//             if (typeof window !== 'undefined') {
//                 await this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
//             }
//         } catch (error) {
//             console.error('Error setting persistence:', error);
//         }
//     }
//     signup(email: string, password: string): Promise<any> {
//         return this.afAuth.createUserWithEmailAndPassword(email, password)
//             .then((result: any) => {
//                 console.log('User signed up successfully:', result);
//                 return result;
//             })
//             .catch(error => {
//                 console.error('Signup failed:', error);
//                 throw error;
//             });
//     }
//     login(email: string, password: string): Promise<any> {
//         return this.afAuth.signInWithEmailAndPassword(email, password)
//             .then(result => {
//                 console.log('User logged in successfully:', result);
//                 return result;
//             })
//             .catch(error => {
//                 console.error('Login failed:', error);
//                 throw error;
//             });
//     }
//     isLoggedIn(): Observable<boolean> {
//         return this.afAuth.authState.pipe(
//             map(user => {
//                 console.log('Current user:', user);
//                 return !!user;
//             })
//         );
//     }

//     logout() {
//         return this.afAuth.signOut();
//     }


// }
