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

	model = new User(null, null, null, null, null, null, null);

	pattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";

	newUser(): void{
		this.sessionService.newUser(this.model).subscribe(data => {
            if (data.status){
            	this.sessionService.signInState.next(true);
        		this.router.navigateByUrl(`/users/${data.id}`); 
            }
            else{
            	console.log(data.errors);
            }
        }, 
        error => {
           	console.log(JSON.stringify(error.json()));
       	});
	}

	onSubmit(){
		this.newUser();
	}

}