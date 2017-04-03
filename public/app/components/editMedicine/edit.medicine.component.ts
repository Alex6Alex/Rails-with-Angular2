import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';

import { MedicineService } from '../../services/medicine.service';
import { Group, SubGroup, Medicine } from '../../models/atcGroups';

@Component({
	moduleId: module.id,
	selector: 'edit.medicine',
	templateUrl: 'edit.medicine.component.html',
	styleUrls: ['edit.medicine.css']
})

export class EditMedicineComponent implements OnInit {
	medicine = new Medicine(null, null, null, null, null, null);
	groups: Group[];
	subGroups = [];

	constructor(private router: Router, private medicineService: MedicineService,
				private title: Title){}

	ngOnInit(){
		this.medicineService.getMedicine(this.router.url).subscribe((data) => {
			this.medicine = data;
			this.medicine.pack = data.package;
			this.subGroups[0] = data.atcSubGroup;
		});

		this.medicineService.getGroups().subscribe((data) =>{
			this.groups = data;
		});	
	}

	getSubGroups(value: string){
		this.medicineService.getSubGroups(`/groups/${value}`)
							.subscribe((data) => {
			this.subGroups = data.atcSubGroups;
		});
		this.medicine.atc_sub_group_id = null;
	}

	updateMedicine(): void{
		this.medicineService.updateMedicine(this.medicine).subscribe(data => {
			if(data.status){
				this.router.navigateByUrl(`/medicines/${data.id}`);
			}
			else{
            	console.log(data.errors);
            }
        }, 
        error => {
           	console.log(JSON.stringify(error.json()));
       	});
	}

	onUpdate(){
		this.updateMedicine();
	}
}