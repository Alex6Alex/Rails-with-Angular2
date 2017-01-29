import { Component, AfterViewInit, ElementRef } from '@angular/core';

import { HomeService } from '../../services/home.service';

@Component({
	moduleId: module.id,
	selector: 'pharmacies',
	templateUrl: 'pharmacies.component.html',
	styleUrls: ['pharmacies.css']
})

export class PharmaciesComponent implements AfterViewInit {
	//change class for selected area
	area = 0;

	constructor(private elementRef: ElementRef){}

	ngAfterViewInit(): void{
		/*ymaps initialzation*/
		let ymaps = document.createElement("script");
		ymaps.type = "text/javascript";
		ymaps.src = "ymaps.js";
		this.elementRef.nativeElement.appendChild(ymaps);
		/*ymaps.ready().then(() => {
			let myMap = new ymaps.Map("mymap", {
				center: [55.76, 37.64],
		        zoom: 7
			});

			let myPlacemark = new ymaps.Placemark([55.76, 37.64], {
		        hintContent: 'Москва!',
		        balloonContent: 'Столица России'
		    });
		});*/
	}
}