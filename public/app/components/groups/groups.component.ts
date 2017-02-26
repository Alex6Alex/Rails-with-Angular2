import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';

import { MedicineService } from '../../services/medicine.service';
import { Group } from '../../models/atcGroups';

@Component({
	moduleId: module.id,
	selector: 'groups',
	templateUrl: 'groups.component.html',
	styleUrls: ['groups.css']
})

export class GroupsComponent implements OnInit {
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