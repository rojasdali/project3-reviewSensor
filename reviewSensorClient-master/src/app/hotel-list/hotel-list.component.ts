import { Component, OnInit, Input } from '@angular/core';
import { YelpService } from '../services/yelp.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { WatsonService } from '../services/watson.service';
import { DataService } from '../services/data.service';
import { BarGaugeComponent } from '../bar-gauge/bar-gauge.component';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {
  price: String = '';
  allTheHotels: Array<any> = [];
  error: any;
  user: any;
  name: String = '';
  firstLetter: String = '';
  showHotels: boolean;
  constructor(private yelpService: YelpService, private watsonService: WatsonService, public dataService: DataService,
    private _route: ActivatedRoute, private router: Router, private authService: AuthService) { this.showHotels = false;
  }

  ngOnInit() {
    if (this.dataService.dataFromService === undefined) {
      console.log('undefined');
      this._route.params.forEach(param => {
        this.price = param['price'];
        console.log(this.price);
      });
    } else {
    this.price = this.dataService.dataFromService;
    }
    // if page is reloaded with out search from landing page, set searchTerm to param in url
      this._route.params.forEach(param => {
        this.dataService.dataFromService = param['searchTerm'];
        this.name = param['searchTerm'];
        this.firstLetter = this.name[0].toUpperCase();
        this.name = this.firstLetter + this.name.slice(1);
      });

    this.yelpService.goToHotelList(this.dataService.dataFromService, this.price)
    .subscribe((theList) => {
      this.showHotels = true;
      this.allTheHotels = theList;
    });
  }

  refresh(): void {
    window.location.reload();
  }


}

