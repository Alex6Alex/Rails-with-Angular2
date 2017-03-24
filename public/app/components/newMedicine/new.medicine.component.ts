import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';

import { MedicineService } from '../../services/medicine.service';
import { Group, SubGroup, Medicine } from '../../models/atcGroups';

@Component({
	moduleId: module.id,
	selector: 'new.medicine',
	templateUrl: 'new.medicine.component.html',
	styleUrls: ['new.medicine.css']
})

export class NewMedicineComponent implements OnInit {
	medicine = new Medicine(null, null, null, null, null, null);
	groups: Group[];
	subGroups: SubGroup[];

	constructor(private router: Router, private medicineService: MedicineService,
				private title: Title){}

	ngOnInit(){
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

	newMedicine(): void{
		this.medicineService.newMedicine(this.medicine).subscribe(data => {
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

	onSubmit(){
		this.newMedicine();
	}
}