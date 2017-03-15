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

	getArea(name: string, area: string, sortBy: string, 
			workTime: string): Promise<any>{
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });
		let body = JSON.stringify({ name: name, area: area, order: sortBy, 
			time: workTime });

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

	//поиск лекарств в определенной аптеке
	searchByPharmacy(term: string, id: number){
		let url = '/medicine_in_pharmacy.json';

		let params = new URLSearchParams();
    	params.set('search', term); // the user's search value
    	params.set('id', id.toString());//pharmacy id
    	params.set('callback', 'JSONP_CALLBACK');
    	// TODO: Add error handling
    	return this.jsonp
            .get(url, { search: params })
            .map(res => res.json());
	}

	//новая аптека
	newPharmacy(pharmacy: Pharmacy){
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	let body = JSON.stringify({
			name: pharmacy.name,
			address: pharmacy.address,
			area: pharmacy.area,
			phone: pharmacy.phone,
			worktime: pharmacy.worktime
    	});

    	return this.http.post('/pharmacies.json', body, options)
    						.map(res => res.json());
	}

	//удаление
	destroyPharmacy(id: number){
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });

    	return this.http.delete(`/pharmacies/${id}.json`, options)
    						.map(() => null);
	}

	//для отдельной аптеки
	getPharmacy(path: string): Observable<Pharmacy>{
		return this.http.get(`${path}.json`)
						.map(res => res.json());
	}
}