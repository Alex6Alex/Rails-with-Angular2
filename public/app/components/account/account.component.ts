import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HomeService } from '../../services/home.service';

@Component({
	moduleId: module.id,
	selector: 'account',
	templateUrl: 'account.component.html',
	styleUrls: ['account.css']
})

export class AccountComponent implements OnInit {
	name: string;
	email: string;
	created_at: string;

	constructor(private router: Router, private homeService: HomeService){}
	
	ngOnInit(): void{
		this.getUserInfo();
	}

	getUserInfo(): void{
		this.homeService.getData(this.router.url).subscribe(data => {
			this.name = data.name;
			this.email = data.email;
			this.created_at = data.created_at;
		});
	}
}