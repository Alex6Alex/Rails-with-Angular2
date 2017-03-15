import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

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
} 