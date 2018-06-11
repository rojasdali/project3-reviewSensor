import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WatsonService } from '../services/watson.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { YelpService } from '../services/yelp.service';
import { MaterialModule } from '../material.module';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {
  @Input() oneSingleHotel: any;
  @Input() checked: any;
  theHotel: any = {};
  showWatson: boolean;
  price: String = '';
  clicked: boolean;
  constructor(private watsonService: WatsonService, public dataService: DataService,
    private router: Router, private _route: ActivatedRoute) {
    this.showWatson = false;
    this.clicked = false;
  }

  ngOnInit() {
    this._route.params.forEach(param => {
      this.price = param['price'];
    });
    if (this.checked) {
      this.getWatsonInfo(this.oneSingleHotel);
    }
    this.theHotel = this.oneSingleHotel;
  }

  getWatsonInfo(hotel) {
    console.log(hotel);
    this.clicked = true;
    const searchTerm  = this.dataService.dataFromService;
    this.watsonService.getWatsonInfo(searchTerm, hotel, this.price)
      .subscribe(oneHotel => {
        this.theHotel = oneHotel;
        this.showWatson = true;
        console.log('ksadjhfkjdhs', this.theHotel.emotions);
      });
    this.router.navigate([`/hotel-list/${this.dataService.dataFromService}/${this.price}`]);
  }



  goToCreateTrip() {
    this.dataService.dataFromService = this.theHotel;
    this.router.navigate([`/create-trip`]);
  }

  refresh(): void {
    window.location.reload();
  }
}


// import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// @Component({
//   selector: 'app-single-contact',
//   templateUrl: './single-contact.component.html',
//   styleUrls: ['./single-contact.component.css']
// })
// export class SingleContactComponent implements OnInit {

//   @Input() oneSingleContact: any;
//   @Output() contactBeingDeleted = new EventEmitter <string>();
//   constructor() { }

//   ngOnInit() {
//   }
//   deleteCont(theContact) {
//     this.contactBeingDeleted.emit(theContact);
//   }

//   delete

// }
