import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response, Http, Jsonp, 
	URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Group, SubGroup, Medicine } from '../models/atcGroups';
import { Price } from '../models/price';

@Injectable()
export class PriceService{
	constructor(private http: Http, private jsonp: Jsonp){}
	
	//новая цена в аптеке
	newPrice(price: Price){
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	let body = JSON.stringify({
			price
    	});

    	return this.http.post('/price_lists.json', body, options)
    						.map(res => res.json());
	}

	//заказ
	reservePrice(user_id: number, price_list_id: number){
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	let body = JSON.stringify({
			reservation: {
				user_id, 
				price_list_id
			}
    	});

    	return this.http.post('/reservations.json', body, options)
    						.map(res => res.json());
	}

	//все заказы пользователя
	getReservations(id: number){
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });
    	let body = JSON.stringify({
			id: id
    	});

    	return this.http.post('/user_reservations.json', body, options)
    						.map(res => res.json());;
	}

	//удаление
	destroyPrice(id: number){
		let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });

    	return this.http.delete(`/price_lists/${id}.json`, options)
    						.map(() => null);
	}
}