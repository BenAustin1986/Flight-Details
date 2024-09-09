import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-flight-details',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit {
  isLoggedIn: boolean = false;
  submissions: any[] = [];
  successMessage: string = '';
  editingIndex: number | null = null;
  formData: any = {};

  constructor(
    private authService: AuthService,
    private flightService: FlightService
  ) {
    this.authService.isLoggedIn().subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
      if (this.isLoggedIn) {
        this.loadUserFlights();
      }
    });
  }

  ngOnInit() {
    if (this.isLoggedIn) {
      this.loadUserFlights();
    }
  }

  loadUserFlights() {
    this.flightService.getFlights().subscribe(flights => {
      this.submissions = flights;
    }, error => {
      console.error('Error fetching flights:', error);
    });
  }

  onSubmit(flightForm: NgForm) {
    if (!this.isLoggedIn) {
      this.successMessage = 'You must be logged in to submit the form.';
      return;
    }

    const flightData = {
      airline: flightForm.value.airline,
      arrivalDate: flightForm.value.arrivalDate,
      arrivalTime: flightForm.value.arrivalTime,
      flightNumber: flightForm.value.flightNumber,
      numOfGuests: flightForm.value.numOfGuests,
      comments: flightForm.value.comments || ''
    };

    if (this.editingIndex !== null) {
      const flightId = this.submissions[this.editingIndex].id;
      this.flightService.updateFlight(flightId, flightData).then(() => {
        this.successMessage = 'Flight updated successfully!';
        this.resetForm(flightForm);
        this.editingIndex = null;
      });
    } else {
      this.flightService.addFlight(flightData).then(() => {
        this.successMessage = 'Flight added successfully!';
        this.resetForm(flightForm);
      });
    }
  }

  resetForm(flightForm: NgForm) {
    flightForm.reset();
    this.successMessage = '';
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  onEdit(index: number) {
    this.editingIndex = index;
    const flight = this.submissions[index];

    this.formData = {
      airline: flight.airline,
      arrivalDate: flight.arrivalDate,
      arrivalTime: flight.arrivalTime,
      flightNumber: flight.flightNumber,
      numOfGuests: flight.numOfGuests,
      comments: flight.comments
    };
  }

  onDelete(index: number) {
    const confirmed = confirm('Are you sure you want to delete this flight information?');
    if (confirmed) {
      const flightId = this.submissions[index].id;
      this.flightService.deleteFlight(flightId).then(() => {
        this.submissions.splice(index, 1);
        this.successMessage = 'Flight deleted successfully!';
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      });
    }
  }
}




  //     this.editingIndex = null;
  //     this.successMessage = 'Flight details updated successfully!';

  //     setTimeout(() => {
  //       this.successMessage = '';
  //     }, 3000);
  //   } else {
  //     this.submissions.push(payload);
  //     this.successMessage = 'Your flight details have been saved!';

  //     setTimeout(() => {
  //       this.successMessage = '';
  //     }, 3000);
  //   }

  //   this.saveSubmissions();

  //   flightForm.reset();
  // }

  // saveSubmissions() {
  //   localStorage.setItem('submissions', JSON.stringify(this.submissions));
  // }

//   onEdit(index: number) {
//     this.editingIndex = index;
//     const submission = this.submissions[index];

//     this.formData = {
//       airline: submission.airline,
//       arrivalDate: submission.arrivalDate,
//       arrivalTime: submission.arrivalTime,
//       flightNumber: submission.flightNumber,
//       numOfGuests: submission.numOfGuests,
//       comments: submission.comments
//     };
//   }

//   onDelete(index: number) {
//     const confirmed = confirm('Are you sure you want to delete this flight information?');
//     if (confirmed) {
//       this.submissions.splice(index, 1);
//       this.saveSubmissions();
//       this.successMessage = 'Flight details deleted successfully!';

//       setTimeout(() => {
//         this.successMessage = '';
//       }, 3000);
//     }
//   }

//   onFormChange() {
//     if (typeof window !== 'undefined' && window.localStorage) {
//       localStorage.setItem('submissions', JSON.stringify(this.submissions));
//     }
//   }
// }
