import { Component, OnInit } from '@angular/core';

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
	myMap;

	constructor(private pharmacyService: PharmacyService){}
	

	ngOnInit(): void{

		this.getPharms();

		ymaps.ready().then(() => {
			this.myMap = new ymaps.Map("mymap", {
				center: [44.578526, 33.532156],
		        zoom: 11,
		        controls: ['zoomControl', 'fullscreenControl']
			});

			let HintLayout = ymaps.templateLayoutFactory.createClass( "<div class='my-hint'>" +
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

		    for (let pharm of this.pharms){
				let myGeocoder = ymaps.geocode(`Севастополь, ${pharm.address}`);
			    myGeocoder.then(res => {
			    	let myPlacemark = new ymaps.Placemark(res.geoObjects.get(0).geometry.getCoordinates(), {
		                title: pharm.name,
		                address: pharm.address
		            }, {
		                hintLayout: HintLayout,
		                preset: 'islands#darkGreenMedicalIcon'
		            });
		            
		            this.myMap.geoObjects.add(myPlacemark);
			    });
			}
		});
	}

	getPharms(){
		this.pharmacyService.getPharms().subscribe(data => {
			this.pharms = data;
		});
	}

	setArea(num: number){
		switch(num){
	        case 0:{
	        	this.area = 0;
	            this.myMap.setCenter([44.578526, 33.532156]);
	            this.myMap.setZoom(11);
	            break;
	        }
	        case 1:{
	        	this.area = 1;
	            this.myMap.setCenter([44.568588, 33.452416]);
	            this.myMap.setZoom(13);
	            break;
	        }
	        case 2:{
	        	this.area = 2;
	            this.myMap.setCenter([44.584961, 33.524793]);
	            this.myMap.setZoom(13);
	            break;
	        }
	        case 3:{
	        	this.area = 3;
	            this.myMap.setCenter([44.615463, 33.568546]);
	            this.myMap.setZoom(13);
	            break;
	        }
	        case 4:{
	        	this.area = 4;
	            this.myMap.setCenter([44.528813, 33.594336]);
	            this.myMap.setZoom(13);
	            break;
	        }
	    }
	}
}