import { Headers, RequestOptions, Response, Http, Jsonp, 
	URLSearchParams } from '@angular/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Pharmacy } from '../models/pharmacy';

@Injectable()
export class PharmacyService{
	constructor(private http: Http, private jsonp: Jsonp){}
	//для всех аптек
	getPharms(): Promise<any[]>{
		return this.http.get('/pharmacies.json').toPromise()
			.then(res => res.json());
	}

	getArea(area: string, sortBy: string, workTime: string): Promise<any>{
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		let body = JSON.stringify({ area: area, order: sortBy, time: workTime });

		return this.http.post('/change_area.json', body, options).toPromise()
			.then(res => res.json());
	}

	search(term: string){
		let url = '/search_pharms.json';

		let params = new URLSearchParams();
    	params.set('search', term); // the user's search value
    	params.set('callback', 'JSONP_CALLBACK');
    	// TODO: Add error handling
    	return this.jsonp
            .get(url, { search: params })
            .map(res => res.json());
	}

	//для отдельной аптеки
	getPharmacy(path: string): Observable<Pharmacy>{
		return this.http.get(`${path}.json`)
						.map(res => res.json());
	}
}