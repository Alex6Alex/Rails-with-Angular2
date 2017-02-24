import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { HomeService } from '../../services/home.service';
import { User } from '../../models/user';

@Component({
	moduleId: module.id,
	selector: 'account',
	templateUrl: 'account.component.html',
	styleUrls: ['account.css']
})

export class AccountComponent implements OnInit {
	user = new User(null, null, null, null, null);

	constructor(private router: Router, private homeService: HomeService){}
	
	ngOnInit(): void{
		this.getUserInfo();
	}

	getUserInfo(): void{
		this.homeService.getUserData(this.router.url).subscribe(data => {
			this.user = data;
		});
	}
}