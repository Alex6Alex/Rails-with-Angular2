import { Component } from '@angular/core';

import { SessionService } from '../../services/session.service';

@Component({
	moduleId: module.id,
	selector: 'home',
	templateUrl: 'home.component.html',
	styleUrls: ['home.css']
})

export class HomeComponent { 
	title: string;

	session = {email: "", password: ""};

	pattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";

	errorLog = false;

	constructor(private sessionService: SessionService){}

	onSubmit(): void{
		this.signIn();
	}

	signIn(): void{
		this.sessionService.signIn(this.session).subscribe(data => {
			console.log(data)
		}, 
		error => {
			this.errorLog = true;
			console.log(this.errorLog);
		});
	}
}