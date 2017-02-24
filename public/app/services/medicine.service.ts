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
}