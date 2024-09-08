import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-flight-details',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit {
  isLoggedIn: boolean = false;
  submissions: any[] = [];
  successMessage: string = '';
  editingIndex: number | null = null;
  formData: any = {};

  constructor(private authService: AuthService, private http: HttpClient) {
    this.authService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });
  }

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedData = localStorage.getItem('submissions');
      if (savedData) {
        this.submissions = JSON.parse(savedData);
      }
    }
  }

  onSubmit(flightForm: NgForm) {
    if (!this.isLoggedIn) {
      this.successMessage = 'You must be logged in to submit the form.';
      return;
    }

    const url = 'https://us-central1-crm-sdk.cloudfunctions.net/flightInfoChallenge';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': 'WW91IG11c3QgYmUgdGhlIGN1cmlvdXMgdHlwZS4gIEJyaW5nIHRoaXMgdXAgYXQgdGhlIGludGVydmlldyBmb3IgYm9udXMgcG9pbnRzICEh',
      'candidate': 'Ben Austin'
    });

    const payload = {
      airline: flightForm.value.airline,
      arrivalDate: flightForm.value.arrivalDate,
      arrivalTime: flightForm.value.arrivalTime,
      flightNumber: flightForm.value.flightNumber,
      numOfGuests: flightForm.value.numOfGuests,
      comments: flightForm.value.comments || ''
    };

    if (this.editingIndex !== null) {
      this.submissions[this.editingIndex] = payload;
      this.editingIndex = null;
      this.successMessage = 'Flight details updated successfully!';

      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    } else {
      this.submissions.push(payload);
      this.successMessage = 'Your flight details have been saved!';

      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }

    this.saveSubmissions();

    flightForm.reset();
  }

  saveSubmissions() {
    localStorage.setItem('submissions', JSON.stringify(this.submissions));
  }

  onEdit(index: number) {
    this.editingIndex = index;
    const submission = this.submissions[index];

    this.formData = {
      airline: submission.airline,
      arrivalDate: submission.arrivalDate,
      arrivalTime: submission.arrivalTime,
      flightNumber: submission.flightNumber,
      numOfGuests: submission.numOfGuests,
      comments: submission.comments
    };
  }

  onDelete(index: number) {
    const confirmed = confirm('Are you sure you want to delete this flight information?');
    if (confirmed) {
      this.submissions.splice(index, 1);
      this.saveSubmissions();
      this.successMessage = 'Flight details deleted successfully!';

      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    }
  }

  onFormChange() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('submissions', JSON.stringify(this.submissions));
    }
  }
}
