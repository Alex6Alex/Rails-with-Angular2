import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from '../models/user';

@Injectable()
export class HomeService{
	constructor(private http: Http){}

	getData(path: string){
		return this.http.get(path + '.json')
			.map(res => res.json());
	}	

	getUsers(): Observable<User[]>{
		return this.http.get('users.json')
			.map(res => res.json());	
	}

	getUserData(path: string): Observable<User>{
		return this.http.get(`${path}.json`)
			.map(res => res.json());
	}

	getDates(){
		return this.http.get('/dates.json').map(res => res.json());
	}

	updateUser(user: User){
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	let body = JSON.stringify({
			name: user.name,
			email: user.email,
			phone: user.phone,
			password: user.password,
			password_confirmation: user.password_confirmation
    	});

    	return this.http.put(`/users/${user.id}.json`, body, options)
    						.map(res => res.json());
	}

	destroyUser(id: number){
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });

    	return this.http.delete(`/users/${id}.json`, options)
    						.map(() => null);
	}
} 