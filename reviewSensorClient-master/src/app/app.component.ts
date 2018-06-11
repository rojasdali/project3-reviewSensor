import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( private route: ActivatedRoute, private router: Router ) {}

  refresh(): void {
    window.location.reload();
  }

  // onAnchorClick ( ) {
  //   this.route.fragment.subscribe ( f => {
  //     const element = document.querySelector ( "#" + f );
  //     if (element) element.scrollIntoView (element)
  //   });
  // }

  // ngOnInit() {
  //   this.router.events.subscribe(s => {
  //     if (s instanceof NavigationEnd) {
  //       const tree = this.router.parseUrl(this.router.url);
  //       if (tree.fragment) {
  //         const element = document.querySelector("#" + tree.fragment);
  //         if (element) { element.scrollIntoView(element); }
  //       }
  //     }
  //   });
  // }

}
