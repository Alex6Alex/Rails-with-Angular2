import { Component, ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { HomeService } from './services/home.service';
import { SessionService } from './services/session.service';
import { HomeComponent } from './components/home/home.component';

@Component({
	moduleId: module.id,
  	selector: 'my-app',
  	encapsulation: ViewEncapsulation.None,
  	templateUrl: 'app.component.html',
  	styleUrls: ['../styles.css'],
  	providers: [ HomeService, SessionService ]
})

export class AppComponent implements AfterViewInit, OnInit {
	//sign user or not
	sign = false;
	//user attributes
	user_id: number;
	user_name: string;

	constructor(private router: Router, private titleService: Title,
		private sessionService: SessionService){}

	//title for pages
	setTitle(title: string){
		this.titleService.setTitle(title);
	};

	//we need it if reload page which is not home page
	ngOnInit(){
		this.isSignIn();
	}

	//listen changes from another rendering parts
	ngAfterViewInit(){
		this.signInState();
	}

	signInState(){
		this.sessionService.signInState.subscribe(status => {
			this.sign = status;
			if(this.sign) this.isSignIn();
		});
	}

	//is user in system
	isSignIn(): void{
		this.sessionService.isSignIn().subscribe(data => {
			if(data.sign){
				//user in system
				this.sign = data.sign;
				this.user_id = data.user.id;
				this.user_name = data.user.name;
			}
		});
	}

	//user exit from system
	logOut(): void{
		this.sessionService.logOut(this.user_id).subscribe(data => {
			this.sign = data;
			//console.log(data);
		});
	}
}