import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loggedInStatus = new BehaviorSubject<boolean>(false);

    constructor(private afAuth: AngularFireAuth) {
        this.setPersistence();
    }

    async setPersistence() {
        try {
            if (typeof window !== 'undefined') {
                await this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
            }
        } catch (error) {
            console.error('Error setting persistence:', error);
        }
    }
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
    isLoggedIn(): Observable<boolean> {
        return this.afAuth.authState.pipe(
            map(user => {
                console.log('Current user:', user);
                return !!user;
            })
        );
    }

    logout() {
        return this.afAuth.signOut();
    }


}
