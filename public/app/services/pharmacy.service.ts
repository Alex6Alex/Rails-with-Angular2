import { Headers, RequestOptions, Response, Http, Jsonp } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PharmacyService{
	constructor(private http: Http, private jsonp: Jsonp){}

	getPharms(): Promise<any[]>{
		return this.http.get('/pharmacies.json').toPromise()
			.then(res => res.json());
	}

	getArea(area: number): Promise<any>{
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		let body = JSON.stringify({ area: area });

		return this.http.post('/change_area.json', body, options).toPromise()
			.then(res => res.json());
	}
}