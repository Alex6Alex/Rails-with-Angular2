import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';

import { MedicineService } from '../../services/medicine.service';
import { SessionService } from '../../services/session.service';
import { Group, SubGroup } from '../../models/atcGroups';

@Component({
	moduleId: module.id,
	selector: 'atcgroup',
	templateUrl: 'atc.group.component.html',
	styleUrls: ['atc.group.css']
})

export class AtcGroupComponent implements OnInit {
	group = new Group(null, null, null);
	newSubGroup = new SubGroup(null, null, null);
	subGroups: SubGroup[];

	canChange: boolean;

	createDialog: boolean;
	updateDialog: boolean;

	constructor(private title: Title, private router: Router, 
				private medicineService: MedicineService,
				private sessionService: SessionService){}

	ngOnInit(): void{
		this.getSubGroups();

		this.sessionService.isAdmin.subscribe(status => {
			this.canChange = status;
		});
	}

	getSubGroups() {
		this.medicineService.getSubGroups(this.router.url)
							.subscribe(data => {
								this.group = data;
								this.subGroups = data.atcSubGroups;

								//setTitle(this.group.description);
							});
	}

	onRefresh(){
		this.newSubGroup = new SubGroup(null, null, null);
	}

	//Добавление подгруппы
	onSubmit(){
		this.medicineService.newSubGroup(this.newSubGroup, this.router.url)
							.subscribe(data => {
			if(data.status){
				this.createDialog = false;
				this.getSubGroups();
				this.newSubGroup = new SubGroup(null, null, null);
			}
			else{
            	console.log(data.errors);
            }
        }, 
        error => {
           	console.log(JSON.stringify(error.json()));
       	});
	}

	//обновление подгруппы
	onUpdate(){
		this.medicineService.updateSubGroup(this.newSubGroup, this.router.url)
							.subscribe(data => {
			if(data.status){
				this.updateDialog = false;
				this.getSubGroups();
				this.newSubGroup = new SubGroup(null, null, null);
			}
			else{
            	console.log(data.errors);
            }
        }, 
        error => {
           	console.log(JSON.stringify(error.json()));
       	});
	}

	//Удаление подгруппы админом
	onDestroy(subGroup: SubGroup): void{
		this.medicineService.destroySubGroup(subGroup.code, 
											this.router.url)
			.subscribe(() => {
				this.subGroups = this.subGroups
					.filter(s => s !== subGroup);
			});
	}
}