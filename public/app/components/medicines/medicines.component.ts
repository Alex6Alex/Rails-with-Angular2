import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';

import { MedicineService } from '../../services/medicine.service';
import { Group } from '../../models/atcGroups';

@Component({
	moduleId: module.id,
	selector: 'medicines',
	templateUrl: 'medicines.component.html',
	styleUrls: ['medicines.css']
})

export class MedicinesComponent implements OnInit {
	atcGroups: Group[];

	constructor(title: Title, private medicineService: MedicineService){
	//	title.setTitle('Поиск лекарств');
	}

	ngOnInit(): void{
		this.getGroups();
	}

	getGroups() {
		this.medicineService.getGroups()
							.subscribe(data => {
								this.atcGroups = data;
							});
	}

}