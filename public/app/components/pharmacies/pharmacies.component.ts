import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

import { PharmacyService } from '../../services/pharmacy.service';
/// <reference path="ymaps.d.ts"/>

@Component({
	moduleId: module.id,
	selector: 'pharmacies',
	templateUrl: 'pharmacies.component.html',
	styleUrls: ['pharmacies.css']
})

export class PharmaciesComponent implements OnInit {
	items: Object;

	showItems: boolean = false;
	resultsIsShow: boolean = false;

	searchTerm: string = null;
	
	pharms = [];
	myMap;

	//параметры выбора района
	area = 0;
	areaName = 'Все';
	//параметры сортировки
	showSortList = false;
	sortBy = 'name';
	sortTitle = 'по названию';
	//параметры режима работы
	showWorkTimes = false;
	workTime = 'all';
	workTitle = 'все';

	constructor(private pharmacyService: PharmacyService){}
	//поиск аптек
	private searchStream = new Subject<string>();
	searchPharm(term: string) {
		//this.items = this.pharmacyService.search(term);
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

		this.getArea(this.searchTerm, this.areaName, 
					this.sortBy, this.workTime, true);	
	}

	ngOnInit(){
		this.ymapsInit();
		this.getPharms();

		this.searchStream
			.debounceTime(300)
			.distinctUntilChanged()
			.switchMap((term: string) => {
				return this.pharmacyService.search(term)
			})
			.subscribe(res => { this.items = res });
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
		});

	}

	//сортировка
	onSort(sortBy: string){
		if(this.sortBy === sortBy)
			return;

		this.sortBy = sortBy;

		this.getArea(this.searchTerm, this.areaName, sortBy, this.workTime, false);

		if(this.sortBy === 'name')
			this.sortTitle = 'по названию';
		else
			this.sortTitle = 'по адресу';
		this.showSortList = false;
	}

	//выбор времени работы
	onWorktimeChange(time: string){
		if(this.workTime == time)
			return;

		this.workTime = time;

		this.getArea(this.searchTerm, this.areaName, 
					this.sortBy, this.workTime, true);

		if(this.workTime === 'all')
			this.workTitle = 'все';
		else if(this.workTime === 'day')
				this.workTitle = 'дневные';
			else
				this.workTitle = 'круглосуточные';
		this.showWorkTimes = false;
	}
	//выбор района
	setArea(num: number, area: string){
		if(this.areaName == area)
			return;

		this.areaName = area;
		this.area = num;

		this.getArea(this.searchTerm, this.areaName, 
					this.sortBy, this.workTime, true);

		switch(num){
	        case 0:{
	            this.myMap.setCenter([44.578526, 33.532156]);
	            this.myMap.setZoom(11);
	            break;
	        }
	        case 1:{
	            this.myMap.setCenter([44.568588, 33.452416]);
	            this.myMap.setZoom(13);
	            break;
	        }
	        case 2:{
	            this.myMap.setCenter([44.584961, 33.524793]);
	            this.myMap.setZoom(13);
	            break;
	        }
	        case 3:{
	            this.myMap.setCenter([44.615463, 33.568546]);
	            this.myMap.setZoom(13);
	            break;
	        }
	        case 4:{
	            this.myMap.setCenter([44.528813, 33.594336]);
	            this.myMap.setZoom(13);
	            break;
	        }
	    }
	}
	//запрос о районе на сервер
	getArea(searchName: string, area: string, sortBy: string, 
			workTime: string, refresh: boolean): void{
		this.pharmacyService.getArea(searchName, area, sortBy, workTime)
    		.then(data => {
    			this.pharms = data;
    			if(refresh){
    				this.myMap.geoObjects.removeAll();
					this.pharmsToMap();
    			}
    		});
	}
	//отобразить аптеки на карте
	pharmsToMap(): void{
		ymaps.ready().then(() => {
			for (let pharm of this.pharms){
				let myGeocoder = ymaps.geocode(`Севастополь, ${pharm.address}`);
			    myGeocoder.then(res => {
			    	let myPlacemark = new ymaps.Placemark(res.geoObjects.get(0).geometry.getCoordinates(), {
		                title: pharm.name,
		                address: pharm.address
		            }, {
		                preset: 'islands#darkGreenMedicalIcon',
		                balloonPanelMaxMapArea: 0,
            			openEmptyBalloon: true
		            });

		            myPlacemark.events.add('balloonopen', (e) => {
		            	let content = `<h4>${pharm.name}</h4>${pharm.address}`;
		            	myPlacemark.properties.set('balloonContent', content);
		            });
		            
		            this.myMap.geoObjects.add(myPlacemark);
			    });
			}
		});
	}
}