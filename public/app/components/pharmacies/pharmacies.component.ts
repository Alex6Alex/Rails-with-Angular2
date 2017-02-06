import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { PharmacyService } from '../../services/pharmacy.service';
/// <reference path="ymaps.d.ts"/>

@Component({
	moduleId: module.id,
	selector: 'pharmacies',
	templateUrl: 'pharmacies.component.html',
	styleUrls: ['pharmacies.css']
})

export class PharmaciesComponent implements OnInit {
	//change class for selected area
	area = 0;
	pharms = [];
	myMap; HintLayout;

	constructor(private pharmacyService: PharmacyService){}
	
	ngOnInit(): void{
		this.ymapsInit();
		this.getPharms();
	}

	getPharms(): Promise<number>{
		this.pharmacyService.getPharms().then(data => {
			this.pharms = data;
			this.pharmsToMap();
		});
		return Promise.resolve(0);
	}

	ymapsInit(): void{

		ymaps.ready().then(() => {
			this.myMap = new ymaps.Map("mymap", {
				center: [44.578526, 33.532156],
		        zoom: 11,
		        controls: ['zoomControl', 'fullscreenControl']
			});

			this.HintLayout = ymaps.templateLayoutFactory.createClass( "<div class='my-hint'>" +
		    "<b>{{ properties.title }}</b><br/> {{ properties.address }}" +
		    "</div>", {
		            getShape: function () {
		                var el = this.getElement(),
		                    result = null;
		                if (el) {
		                    var firstChild = el.firstChild;
		                    result = new ymaps.shape.Rectangle(
		                        new ymaps.geometry.pixel.Rectangle([
		                            [0, 0],
		                            [firstChild.offsetWidth, firstChild.offsetHeight]
		                        ])
		                    );
		                }
		                return result;
		            }
		        }
		    );
		});

	}

	setArea(num: number){
		switch(num){
	        case 0:{
	        	this.pharmacyService.getArea(0)
	        		.then(data => {
	        			this.myMap.geoObjects.removeAll();
	        			this.pharms = data;
	        			this.pharmsToMap();
	        		});
	        	this.area = 0;
	            this.myMap.setCenter([44.578526, 33.532156]);
	            this.myMap.setZoom(11);
	            break;
	        }
	        case 1:{
	        	this.pharmacyService.getArea(1)
	        		.then(data => {
	        			this.myMap.geoObjects.removeAll();
	        			this.pharms = data;
	        			this.pharmsToMap();
	        		});
	        	this.area = 1;
	            this.myMap.setCenter([44.568588, 33.452416]);
	            this.myMap.setZoom(13);
	            break;
	        }
	        case 2:{
	        	this.pharmacyService.getArea(2)
	        		.then(data => {
	        			this.myMap.geoObjects.removeAll();
	        			this.pharms = data;
	        			this.pharmsToMap();
	        		});
	        	this.area = 2;
	            this.myMap.setCenter([44.584961, 33.524793]);
	            this.myMap.setZoom(13);
	            break;
	        }
	        case 3:{
	        	this.pharmacyService.getArea(3)
	        		.then(data => {
	        			this.myMap.geoObjects.removeAll();
	        			this.pharms = data;
						this.pharmsToMap();
	        		});
	        	this.area = 3;
	            this.myMap.setCenter([44.615463, 33.568546]);
	            this.myMap.setZoom(13);
	            break;
	        }
	        case 4:{
	        	this.pharmacyService.getArea(4)
	        		.then(data => {
	        			this.myMap.geoObjects.removeAll();
	        			this.pharms = data;
	        			this.pharmsToMap();
	        		});
	        	this.area = 4;
	            this.myMap.setCenter([44.528813, 33.594336]);
	            this.myMap.setZoom(13);
	            break;
	        }
	    }
	}

	pharmsToMap(): void{
		ymaps.ready().then(() => {
			for (let pharm of this.pharms){
				let myGeocoder = ymaps.geocode(`Севастополь, ${pharm.address}`);
			    myGeocoder.then(res => {
			    	let myPlacemark = new ymaps.Placemark(res.geoObjects.get(0).geometry.getCoordinates(), {
		                title: pharm.name,
		                address: pharm.address
		            }, {
		                hintLayout: this.HintLayout,
		                preset: 'islands#darkGreenMedicalIcon'
		            });
		            
		            this.myMap.geoObjects.add(myPlacemark);
			    });
			}
		});
	}
}