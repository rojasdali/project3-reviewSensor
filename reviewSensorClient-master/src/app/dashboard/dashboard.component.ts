import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MaterialModule } from '../material.module';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import {MatProgressBarModule} from '@angular/material/progress-bar';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allUserTrips: Array<any> = [];
  user: any;
  error: any;
  showForm: boolean;
  formInfo: any = {tripName: '', startDate: '', endDate: '', tripNotes: ''};
  selectedTrip: {};

  constructor(private router: Router, private authService: AuthService,
    private crudService: CrudService) { this.showForm = false; }

  ngOnInit() {
    this.authService.isLoggedIn()
    .then( () => {
      this.user = this.authService.currentUser;
      if (this.user === null) {
        this.router.navigate(['/login']);
      } else {
        this.getUserTrips();
      }
    })
    .catch( err =>  {
      console.log('error in dashboard component =======> ', err);
    });
    this.user = this.authService.currentUser;
  }

  getUserTrips() {
    this.authService.getPrivateData(this.user._id)
    .subscribe(listOfUserTrips => {
      this.allUserTrips = listOfUserTrips;
      console.log(this.allUserTrips);
    });
  }

  deleteTrip(selectedTrip) {
    this.selectedTrip = selectedTrip;
    this.crudService.deleteTrip(selectedTrip._id)
    .subscribe(() => {
      this.getUserTrips();
    });
  }

  showEditForm(selectedTrip) {
    this.selectedTrip = selectedTrip;
    this.formInfo.tripName = selectedTrip.tripName;
    console.log(selectedTrip);
    console.log(selectedTrip.startDate);
    this.formInfo.startDate = new Date(selectedTrip.startDate);
    this.formInfo.endDate = selectedTrip.endDate;
    this.formInfo.tripNotes = selectedTrip.tripNotes;
    this.showForm = !this.showForm;
  }
  updateTrip(selectedTrip) {
    this.showForm = !this.showForm;
    this.crudService.updateTrip(selectedTrip._id, this.formInfo)
    .subscribe(() => {
      this.getUserTrips();
      this.formInfo = {};
  });
}

refresh(): void {
  window.location.reload();
}

}
