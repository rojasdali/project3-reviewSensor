import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  formInfo: any = {username: '', userFname: '', userLname: '', password: ''};
  user: any;
  error: any;
  title = 'app';

  ngOnInit() {
    this.authService.isLoggedIn()
      .then( () => {
        this.user = this.authService.currentUser;
        if (this.user === null) {
          this.router.navigate(['/signup']);
        } else {
          this.router.navigate(['/index']);
        }
      })
      .catch( err =>  {
        console.log('error in signup component =======> ', err);
        this.router.navigate(['/signup']);
      });

  }


  signup() {
    this.authService.signup(this.formInfo)
      .subscribe(
        (user) => {this.user = user;  console.log('User on signup:', this.user ); },
        (err) => this.error = err
      );
  }

  refresh(): void {
    window.location.reload();
  }

}
