import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService{
	constructor(private http: Http){}

	getData(){
		return this.http.get('/home.json')
			.map(res => res.json());
	}	

	getDates(){
		return this.http.get('/dates.json').map(res => res.json());
	}
} 