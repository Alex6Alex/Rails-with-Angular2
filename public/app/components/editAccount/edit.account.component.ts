import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user';
import { HomeService } from '../../services/home.service';

@Component({
	moduleId: module.id,
	selector: 'edit-account',
	templateUrl: 'edit.account.component.html',
	styleUrls: ['edit.account.css']
})

export class EditAccountComponent implements OnInit { 
	constructor(private homeService: HomeService, private router: Router){}

	model = new User(null, null, null, null, null, null, null);

	pattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";

	ngOnInit(){
		this.getUser();
	}

	getUser(){
		this.homeService.getUserData(this.router.url).subscribe(data => {
			this.model = data;
			if (this.model.phone === 'не указан'){
				this.model.phone = null;
			}
		});
	}

	updateUser(): void{
		this.homeService.updateUser(this.model).subscribe(data => {
            if (data.status){
        		this.router.navigateByUrl(`/users/${data.id}`); 
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
		this.updateUser();
	}

}