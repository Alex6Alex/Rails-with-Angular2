import { Component, OnInit } from '@angular/core';

import { SessionService } from '../../services/session.service';

@Component({
	moduleId: module.id,
	selector: 'home',
	templateUrl: 'home.component.html',
	styleUrls: ['home.css']
})

export class HomeComponent implements OnInit { 

	session = {email: "", password: ""};
	sign = false;
	user_id: number;
	user_name: string = "";

	pattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";

	errorLog = false;

	constructor(private sessionService: SessionService){}

	ngOnInit(): void{
		this.sessionService.sign_in().subscribe(data => {
			if(data.sign){
				this.sign = data.sign;
				this.user_id = data.user.id;
				this.user_name = data.user.name;
			}
		});
	}

	onSubmit(): void{
		this.signIn();
	}

	signIn(): void{
		this.sessionService.signIn(this.session).subscribe(data => {
			this.sign = true;
			this.errorLog = false;
			this.user_id = data.id;
			this.user_name = data.name;
		}, 
		error => {
			this.errorLog = true;
			console.log(JSON.stringify(error.json()));
		});
	}

	logOut(): void{
		this.sessionService.logOut(this.user_id).subscribe(data => {
			this.sign = false;
			console.log(data);
		});
	}
}