import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';

import { MedicineService } from '../../services/medicine.service';
import { SessionService } from '../../services/session.service';

import { Medicine } from '../../models/atcGroups';
import { Pharmacy } from '../../models/pharmacy';

@Component({
	moduleId: module.id,
	selector: 'medicine',
	templateUrl: 'medicine.component.html',
	styleUrls: ['medicine.css']
})

export class MedicineComponent implements OnInit {
	medicine = new Medicine(null, null, null, null, null, null);
	prices: Object;
	price: number = null;
	count = null;

	canChange: boolean;

	//параметры сортировки
	showSortList = false;
	sortBy = 'name';
	sortTitle = 'по названию';
	//параметры режима работы
	showWorkTimes = false;
	workTime = 'all';
	workTitle = 'все';

	constructor(private title: Title, private router: Router, 
				private medicineService: MedicineService,
				private sessionService: SessionService){}

	ngOnInit(): void{
		this.getMedicine();

		this.sessionService.isAdmin.subscribe(status => {
			this.canChange = status;
		});
	}

	getMedicine() {
		this.medicineService.getMedicine(this.router.url)
							.subscribe(data => {
								this.medicine = data.medicine;
								this.medicine.pack = data.medicine.package;

								this.prices = data.prices;
								//setTitle(this.group.description);
							});
	}

	//сортировка
	onSort(sortBy: string){
		if(this.sortBy === sortBy)
			return;

		this.sortBy = sortBy;

		this.setOrder(this.sortBy, this.workTime);

		if(this.sortBy === 'name')
			this.sortTitle = 'по названию';
		else if(this.sortBy === 'address')
				this.sortTitle = 'по адресу';
			else
				this.sortTitle = 'по цене';
		this.showSortList = false;
	}

	//выбор времени работы
	onWorktimeChange(time: string){
		if(this.workTime == time)
			return;

		this.workTime = time;

		this.setOrder(this.sortBy, this.workTime);

		if(this.workTime === 'all')
			this.workTitle = 'все';
		else if(this.workTime === 'day')
				this.workTitle = 'дневные';
			else
				this.workTitle = 'круглосуточные';
		this.showWorkTimes = false;
	}

	setOrder(order: string, time: string){
		this.medicineService.setOrder(order, time, this.medicine.id)
							.subscribe(data => {
								this.prices = data;
							});
	}

}