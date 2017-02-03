import { Headers, RequestOptions, Response, Http, Jsonp } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PharmacyService{
	constructor(private http: Http, private jsonp: Jsonp){}

	/*get all pharms*/
	getPharms(){
		/*let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	let body = JSON.stringify({ area: area });*/

		return this.http.get('/pharmacies.json')
			.map(res => res.json());
	}
}