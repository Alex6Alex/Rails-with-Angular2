import { Headers, RequestOptions, Response, Http, Jsonp } from '@angular/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { User } from '../models/user';

@Injectable()
export class SessionService{
	constructor(private http: Http, private jsonp: Jsonp){}

	//обновить компоненты, когда пользователь вошел/вышел
	signInState = new BehaviorSubject(false);
	isAdmin = new BehaviorSubject(false);

	public _isAdmin: Promise<boolean> = this.isAdmin.toPromise();

	//регистрация
	newUser(user: User){
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	let body = JSON.stringify({
			name: user.name,
			email: user.email,
			phone: user.phone,
			password: user.password,
			password_confirmation: user.password_confirmation
    	});

    	return this.http.post('/users.json', body, options)
    						.map(res => res.json());
	}

	//Вход
	signIn(sessionData){
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = JSON.stringify(sessionData);

		return this.http.post('/sessions.json', body, options).map(res => res.json());
	}

	//выход
	logOut(id: number){
		return this.http.delete('/sessions/'+ id +'.json').map(res => res.json());
	}

	isSignIn(){
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({headers: headers});
		let body = "";

		return this.http.post('/signstate.json', body, options).map(res => res.json());
	}
}