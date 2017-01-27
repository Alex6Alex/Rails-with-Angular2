import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { HomeService } from './services/home.service';
import { SessionService } from './services/session.service';

@Component({
	moduleId: module.id,
  	selector: 'my-app',
  	encapsulation: ViewEncapsulation.None,
  	templateUrl: 'app.component.html',
  	styleUrls: ['../styles.css'],
  	providers: [ HomeService, SessionService ]
})

export class AppComponent implements OnInit {

	sign: boolean;
	id: number;
	user_name: string;

	constructor(private router: Router, private titleService: Title,
		private sessionService: SessionService){}

	setTitle(title: string){
		this.titleService.setTitle(title);
	};

	ngOnInit(): void{
		this.sign_in();
	}

	sign_in(): void{
		this.sessionService.sign_in().subscribe(data => {
			if(data.sign){
				this.sign = data.sign;
				this.id = data.user.id;
				this.user_name = data.user.name;
			}
		});
	}

	logOut(): void{
		this.sessionService.logOut(this.id).subscribe(data => {
			this.sign = data;
			console.log(data);
		});
	}
}