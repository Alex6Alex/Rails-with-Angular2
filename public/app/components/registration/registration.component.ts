import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user';
import { SessionService } from '../../services/session.service';

@Component({
	moduleId: module.id,
	selector: 'registration',
	templateUrl: 'registration.component.html',
	styleUrls: ['registration.css']
})

export class RegistrationComponent { 
	constructor(private sessionService: SessionService, private router: Router){}

	model = new User("", "", "", "");

	
	pattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";

	newUser(): void{
		this.sessionService.newUser(this.model).subscribe(data => {
			this.sessionService.signInState.next(true);

            let id = data.id;
        	this.router.navigateByUrl('/users/' + id); 
        }, 
        error => {
           	console.log(JSON.stringify(error.json()));
       	});
	}

	onSubmit(){
		this.newUser();
	}

}