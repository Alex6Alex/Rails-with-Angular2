import { Component } from '@angular/core';

import { User } from '../../models/user';

@Component({
	moduleId: module.id,
	selector: 'registration',
	templateUrl: 'registration.component.html',
	styleUrls: ['registration.css']
})

export class RegistrationComponent { 

	model = new User("", "", "", "");
}