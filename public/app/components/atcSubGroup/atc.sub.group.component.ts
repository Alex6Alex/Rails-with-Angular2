import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';

import { MedicineService } from '../../services/medicine.service';
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

	constructor(private title: Title, private router: Router, 
				private medicineService: MedicineService){}

	ngOnInit(): void{
		this.getMedicines();
	}

	getMedicines() {
		this.medicineService.getMedicines(this.router.url)
							.subscribe(data => {
								this.subGroup = data.subgroup;
								this.medicines = data.medicines;

								//setTitle(this.group.description);
							});
	}

}