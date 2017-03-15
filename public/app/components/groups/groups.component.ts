import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';

import { MedicineService } from '../../services/medicine.service';
import { Group } from '../../models/atcGroups';

@Component({
	moduleId: module.id,
	selector: 'groups',
	templateUrl: 'groups.component.html',
	styleUrls: ['groups.css']
})

export class GroupsComponent implements OnInit {
	items: Object;

	showItems: boolean = false;
	resultsIsShow: boolean = false;

	searchTerm: string = null;

	atcGroups: Group[];

	constructor(title: Title, private medicineService: MedicineService){
	//	title.setTitle('Поиск лекарств');
	}

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

	ngOnInit(): void{
		this.getGroups();

		this.searchStream
			.debounceTime(300)
			.distinctUntilChanged()
			.switchMap((term: string) => {
				return this.medicineService.search(term)
			})
			.subscribe(res => { this.items = res });
	}

	getGroups() {
		this.medicineService.getGroups()
							.subscribe(data => {
								this.atcGroups = data;
							});
	}

}