import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';

import { MedicineService } from '../../services/medicine.service';
import { SessionService } from '../../services/session.service';
import { PharmacyService } from '../../services/pharmacy.service';
import { PriceService } from '../../services/price.service';

import { Medicine } from '../../models/atcGroups';
import { Pharmacy } from '../../models/pharmacy';
import { Price } from '../../models/price';

@Component({
	moduleId: module.id,
	selector: 'medicine',
	templateUrl: 'medicine.component.html',
	styleUrls: ['medicine.css']
})

export class MedicineComponent implements OnInit {
	medicine = new Medicine(null, null, null, null, null, null);
	prices = [];
	price: number = null;
	count = null;

	user_id: number;
	canBuy: boolean;
	canChange: boolean;

	showDialog: boolean;

	pharmacies: Pharmacy[];
	newPrice = new Price(null, null, null, null, null);

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
				private sessionService: SessionService,
				private pharmacyService: PharmacyService,
				private priceService: PriceService){}

	ngOnInit(): void{
		this.getMedicine();

		this.sessionService.signInState.subscribe(status => {
			this.canBuy = status;
		});

		this.sessionService.isAdmin.subscribe(status => {
			this.canChange = status;

			if (this.canChange == true){
				this.pharmacyService.getPharms().then(data => {
					this.pharmacies = data;
				});
			}
		});
	}

	createPrice(): void{
		this.newPrice.medicine_id = this.medicine.id;
		this.priceService.newPrice(this.newPrice).subscribe(data => {
			if(data.status){
				//this.router.navigateByUrl(`/medicines/${data.id}`);
				this.getMedicine();
				this.onRefresh();
			}
			else{
            	console.log(data.errors);
            }
        }, 
        error => {
           	console.log(JSON.stringify(error.json()));
       	});
	}

	onSubmit(){
		this.createPrice();
	}

	onReserve(price: Price){
		this.priceService.reservePrice(this.user_id, price.id).subscribe(() => {
			for (let _price of this.prices){
				if (_price === price){
					_price.count--;
					break;
				}
			}
		});
	}

	//Удаление
	onDestroy(price: any): void{
		this.priceService.destroyPrice(price.id).subscribe(() => {
			this.prices = this.prices.filter(p => p !== price);
		});
	}

	onRefresh(){
		this.newPrice = new Price(null, null, null, null, null);
	}

	getMedicine() {
		this.medicineService.getMedicine(this.router.url)
							.subscribe(data => {
								this.medicine = data.medicine;
								this.medicine.pack = data.medicine.package;

								this.prices = data.prices;

								this.user_id = data.id;
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