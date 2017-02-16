import { Component, OnInit } from '@angular/core';

import { SessionService } from '../../services/session.service';

@Component({
	moduleId: module.id,
	selector: 'home',
	templateUrl: 'home.component.html',
	styleUrls: ['home.css']
})

export class HomeComponent implements OnInit { 
	//session model
	session = {email: "", password: ""};
	//sign user or not
	sign = false;
	m = 0;
	//user attributes
	user_id: number;
	user_name: string = "";
	//pattern for mail
	pattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
	//error if login data invalid
	errorLog = false;

	constructor(private sessionService: SessionService){}

	ngOnInit(): void{
		
		//get data from server
		this.sessionService.isSignIn().subscribe(data => {
			if(data.sign){
				//get current user information
				this.sign = data.sign;
				this.user_id = data.user.id;
				this.user_name = data.user.name;
				//function for send bool data to header
				this.signInState(true);

				this.m = 2;
				this.signState();
			}
			else{
				this.m = 1
				this.signState();
			}
		});
	}
	//functon for sign in button
	onSubmit(): void{
		this.signIn();
	}

	//function for send bool data to header
	signInState(value: boolean){
		this.sessionService.signInState.next(value);
	}

	//if log out via header
	signState(){
		this.sessionService.signInState.subscribe(status => {
			this.sign = status;
			if(!this.sign) this.m = 1;
		});
	}

	//sign registered user in 
	signIn(): void{
		this.sessionService.signIn(this.session).subscribe(data => {
			this.sign = true;
			//don't show error message
			this.errorLog = false;
			//get current user information
			this.user_id = data.id;
			this.user_name = data.name;
			this.signInState(true);
			this.m = 2; 
		}, 
		error => {
			//show error message
			this.errorLog = true;
		});
	}

	//exit form system
	logOut(): void{
		this.sessionService.logOut(this.user_id).subscribe(data => {
			this.sign = false;
			this.m = 1;
			//send to header
			this.signInState(false);
			//console.log(data);
		});
	}
}