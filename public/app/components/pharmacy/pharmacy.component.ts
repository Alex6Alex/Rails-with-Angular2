import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

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
	pharmacy = new Pharmacy(null, null, null, null, null);

	constructor(private router: Router, private pharmacyService: PharmacyService){}

	ngOnInit(){
		this.pharmacyService.getPharmacy(this.router.url)
							.subscribe(data => {
								this.pharmacy = data;
								this.ymapsInit(data.address);
							});
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