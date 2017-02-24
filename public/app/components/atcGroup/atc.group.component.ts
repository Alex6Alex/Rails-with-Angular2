import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';

import { MedicineService } from '../../services/medicine.service';
import { Group, SubGroup } from '../../models/atcGroups';

@Component({
	moduleId: module.id,
	selector: 'atc-group',
	templateUrl: 'atc.group.component.html',
	styleUrls: ['atc.group.css']
})

export class AtcGroupComponent implements OnInit {
	group = new Group(null, null, null);
	subGroups: SubGroup[];

	constructor(title: Title, private router:Router, 
				private medicineService: MedicineService){
	//	title.setTitle('Поиск лекарств');
	}

	ngOnInit(): void{
		this.getSubGroups();
	}

	getSubGroups() {
		this.medicineService.getSubGroups(this.router.url)
							.subscribe(data => {
								this.group = data.group;
								this.subGroups = data.subgroups;
							});
	}

}