import { Component } from '@angular/core';

import { User } from '../../models/user';
import { SessionService } from '../../services/session.service';

@Component({
	moduleId: module.id,
	selector: 'registration',
	templateUrl: 'registration.component.html',
	styleUrls: ['registration.css']
})

export class RegistrationComponent { 
	title: string;

	constructor(private sessionService: SessionService){}

	model = new User("", "", "", "");

	email_valid = false;
	pattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";

	newUser(): void{
		this.sessionService.newUser(this.model).subscribe(data => {
                alert(data);
          }, error => {
              console.log(JSON.stringify(error.json()));
          });
	}

	onSubmit(){
		this.newUser();
	}

}