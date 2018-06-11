import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { YelpService } from '../services/yelp.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  searchTerm: String = '';
  user: any;
  formInfo: any = {username: '', password: ''};
  error: any;

  constructor(private yelpService: YelpService, public dataService: DataService,
    private router: Router, private authService: AuthService
  ) { }

  ngOnInit() {

    this.authService.isLoggedIn()
    .then( () => {
      this.user = this.authService.currentUser;
      if (this.user === null) {
      }
    })
    .catch( err =>  {
      console.log('error in landing component =======> ', err);
    });

    this.user = this.authService.currentUser;
    console.log(this.user);
  }

  refresh(): void {
    window.location.reload();
  }
  logout() {
    this.authService.logout()
      .subscribe(
        () => {
          this.user = null;
        },
        (err) => this.error = err
      );
    console.log('user signed out', this.user);
    this.router.navigate(['/login']);
  }
  goToHotelList(price) {
    this.dataService.dataFromService = this.searchTerm;
      this.router.navigate([`/hotel-list/${this.searchTerm}/${price}`]);
      this.dataService.dataFromService = price;
      console.log(this.dataService);
  }

  goToDashboard() {
    this.router.navigate([`/dashboard/${this.user._id}`]);
  }

}
