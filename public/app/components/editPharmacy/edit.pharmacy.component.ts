import { Component, OnInit, EventEmitter } from '@angular/core';
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
	selector: 'edit.pharmacy',
	templateUrl: 'edit.pharmacy.component.html',
	styleUrls: ['edit.pharmacy.css']
})

export class EditPharmacyComponent implements OnInit {
	pharmacy = new Pharmacy(null, null, null, null, null, null);

	areas = ['Гагаринский', 'Ленинский', 'Нахимовский', 'Балаклавский'];

	//для решение проблемы с отображением адреса
	public addressFocus = new EventEmitter<boolean>();
	public addressBlur = new EventEmitter<boolean>();

	constructor(private router: Router, private pharmacyService: PharmacyService,
				private title: Title){}

	ngOnInit(){
		this.pharmacyService.getPharmacy(this.router.url)
							.subscribe(data => {
								this.pharmacy = data;
							});
		this.ymapsInit();
	}

	editPharmacy(): void{
		this.pharmacyService.editPharmacy(this.pharmacy).subscribe(data => {
			if(data.status){
				this.router.navigateByUrl(`/pharmacies/${data.id}`);
			}
			else{
            	console.log(data.errors);
            }
        }, 
        error => {
           	console.log(JSON.stringify(error.json()));
       	});
	}

	onUpdate(){
		this.editPharmacy();
	}

	ymapsInit(){
		ymaps.ready().then(() => {
			var myMap = new ymaps.Map("mymap", {
				center: [44.578526, 33.532156],
		        zoom: 11,
		        controls: ['zoomControl', 'fullscreenControl']
			});

			myMap.events.add('click', (e)=>{
				var coords = e.get('coords');

				var myGeocoder = ymaps.geocode(coords);
				myGeocoder.then(res => {
					if (res.geoObjects.get(0).properties.get('metaDataProperty')
								.GeocoderMetaData.kind == 'house'){
						this.pharmacy.address = res.geoObjects.get(0)
												.properties.get('name');
						this.addressFocus.emit(true);
						this.addressBlur.emit(true);
					}
				});
			});
		});
	}
}