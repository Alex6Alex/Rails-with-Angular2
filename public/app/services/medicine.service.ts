import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response, Http, Jsonp, 
	URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Group } from '../models/atcGroups';

@Injectable()
export class MedicineService{
	constructor(private http: Http, private jsonp: Jsonp){}
	//основная классификация
	getGroups(): Observable<Group[]>{
		return this.http.get('/groups.json')
						.map(res => res.json());
	}

	//подгруппы
	getSubGroups(path: string) {
		return this.http.get(`${path}.json`)
						.map(res => res.json());
	}

	//лекарства из подгруппы
	getMedicines(path: string) {
		return this.http.get(`${path}.json`)
						.map(res => res.json());
	}

	//лекарство
	getMedicine(path: string) {
		return this.http.get(`${path}.json`)
						.map(res => res.json());
	}

	//сортировка
	setOrder(order: string, time: string, id: number){
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		let body = JSON.stringify({ order: order, time: time, id: id });

		return this.http.post('/ordering.json', body, options)
						.map(res => res.json());
	}

	//поиск лекарств
	search(term: string){
		let url = '/search_medicines.json';

		let params = new URLSearchParams();
    	params.set('search', term); // the user's search value
    	params.set('callback', 'JSONP_CALLBACK');
    	// TODO: Add error handling
    	return this.jsonp
            .get(url, { search: params })
            .map(res => res.json());
	}
}