import { Headers, RequestOptions, Response, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { User } from '../models/user';

@Injectable()
export class SessionService{
	constructor(private http: Http){}

	newUser(user: User){

		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	let body = JSON.stringify({
			name: user.name,
			email: user.email,
			password: user.password,
			password_confirmation: user.password_confirmation
    	});

    	return this.http.post('/users.json', body, options).map(res => res.json());
	}
}