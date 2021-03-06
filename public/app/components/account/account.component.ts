import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { HomeService } from '../../services/home.service';
import { PriceService } from '../../services/price.service';
import { User } from '../../models/user';

import { AppComponent } from '../../app.component';

import { Md5 } from 'ts-md5/dist/md5';

@Component({
	moduleId: module.id,
	selector: 'account',
	templateUrl: 'account.component.html',
	styleUrls: ['account.css']
})

export class AccountComponent implements OnInit {
	user = new User(null, null, null, null, null, null, null);

	gravatar;

	reservations = [];

	constructor(private router: Router, 
				private homeService: HomeService, 
				private priceService: PriceService,
				private appComponent: AppComponent){}
	
	ngOnInit(): void{
		this.getUserInfo();
	}

	getUserInfo(): void{
		this.homeService.getUserData(this.router.url).subscribe(data => {
			this.user = data;
			this.gravatar = Md5.hashStr(data.email);

			this.appComponent.user.id = this.user.id;
			this.appComponent.user.name = this.user.name;
			this.appComponent.user.gravatar = this.gravatar;

			this.getReservations();
		});
	}

	getReservations(): void{
		this.priceService.getReservations(this.user.id).subscribe(data => {
			this.reservations = data;
			console.log(data);
		})
	}
}