import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';

import { MedicineService } from '../../services/medicine.service';
import { SessionService } from '../../services/session.service';
import { Medicine, SubGroup } from '../../models/atcGroups';

@Component({
	moduleId: module.id,
	selector: 'atc-sub-group',
	templateUrl: 'atc.sub.group.component.html',
	styleUrls: ['atc.sub.group.css']
})

export class AtcSubGroupComponent implements OnInit {
	subGroup = new SubGroup(null, null, null);
	medicines: Medicine[];

	canChange: boolean;

	constructor(private title: Title, private router: Router, 
				private medicineService: MedicineService,
				private sessionService: SessionService){}

	ngOnInit(): void{
		this.getMedicines();

		this.sessionService.isAdmin.subscribe(status => {
			this.canChange = status;
		});
	}

	getMedicines() {
		this.medicineService.getMedicines(this.router.url)
							.subscribe(data => {
								this.subGroup = data.subgroup;
								this.medicines = data.medicines;

								//setTitle(this.group.description);
							});
	}

	//Удаление препарата админом
	onDestroy(medicine: Medicine): void{
		this.medicineService.destroyMedicine(medicine.id)
			.subscribe(() => {
				this.medicines = this.medicines
					.filter(m => m !== medicine);
			});
	}
}