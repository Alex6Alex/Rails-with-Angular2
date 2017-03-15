import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

import { PharmacyService } from '../../services/pharmacy.service';
import { Pharmacy } from '../../models/pharmacy';
/// <reference path="ymaps.d.ts"/>

@Component({
	moduleId: module.id,
	selector: 'pharmacy',
	templateUrl: 'pharmacy.component.html',
	styleUrls: ['pharmacy.css']
})

export class PharmacyComponent implements OnInit {
	items: Object;

	showItems: boolean = false;
	resultsIsShow: boolean = false;

	searchTerm: string = null;

	pharmacy = new Pharmacy(null, null, null, null, null, null);

	constructor(private router: Router, private pharmacyService: PharmacyService,
				private title: Title){}

	//поиск аптек
	private searchStream = new Subject<string>();
	searchPharm(term: string) {
		this.searchStream.next(term); 
	}

	//скрывать результаты поиска, если кликнули на др. объект
	onShowSearchRes(value: boolean){	
		if (this.resultsIsShow) { return };
		this.showItems = value;
	}

	//результат поиска
	onSubmit(value: string){
		if (this.searchTerm === value)
			return;
		
		this.searchTerm = value;

		//this.getArea(this.searchTerm, this.areaName, 
		//			this.sortBy, this.workTime, true);	
	}

	ngOnInit(){
		this.pharmacyService.getPharmacy(this.router.url)
							.subscribe(data => {
								this.pharmacy = data;

								//this.title.setTitle(this.pharmacy.name);
								this.ymapsInit(data.address);
							});

		this.searchStream
			.debounceTime(300)
			.distinctUntilChanged()
			.switchMap((term: string) => {
				return this.pharmacyService.searchByPharmacy(term, this.pharmacy.id)
			})
			.subscribe(res => { this.items = res });
	}

	ymapsInit(address: string): void{
		ymaps.ready().then(() => {
			let myGeocoder = ymaps.geocode(`Севастополь, ${address}`);
			myGeocoder.then(res => {
				let lat = res.geoObjects.get(0).geometry.getCoordinates()[0];
				let lng = res.geoObjects.get(0).geometry.getCoordinates()[1];

				let myMap = new ymaps.Map("mymap", {
					center: [lat, lng],
			        zoom: 16,
			        controls: ['zoomControl', 'fullscreenControl']
				});

				let myPlacemark = new ymaps.Placemark(res.geoObjects.get(0).geometry.getCoordinates(), {
					iconContent: `${this.pharmacy.name} (${this.pharmacy.address})`
				}, {
					preset: "islands#darkGreenStretchyIcon"
				});

				myMap.geoObjects.add(myPlacemark);
			});

			
		});
	}
}