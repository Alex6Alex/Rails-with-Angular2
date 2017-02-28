import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';

import { MedicineService } from '../../services/medicine.service';
import { Medicine } from '../../models/atcGroups';

@Component({
	moduleId: module.id,
	selector: 'medicine',
	templateUrl: 'medicine.component.html',
	styleUrls: ['medicine.css']
})

export class MedicineComponent implements OnInit {
	medicine = new Medicine(null, null, null, null, null, null);

	constructor(private title: Title, private router: Router, 
				private medicineService: MedicineService){}

	ngOnInit(): void{
		this.getMedicine();
	}

	getMedicine() {
		this.medicineService.getMedicine(this.router.url)
							.subscribe(data => {
								this.medicine = data;
								this.medicine.pack = data.package;
								//setTitle(this.group.description);
							});
	}

}