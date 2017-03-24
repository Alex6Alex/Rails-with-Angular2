import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { HomeService } from '../../services/home.service';
import { User } from '../../models/user';

import { Md5 } from 'ts-md5/dist/md5';

@Component({
	moduleId: module.id,
	selector: 'users',
	templateUrl: 'users.component.html',
	styleUrls: ['users.css']
})

export class UsersComponent implements OnInit {
	users: User[];

	gravatars = {};

	constructor(private router: Router, private homeService: HomeService){}
	
	ngOnInit(): void{
		this.getUsers();
	}

	getUsers(): void{
		this.homeService.getUsers().subscribe(data => {
			this.users = data;
			data.forEach((d) => {
				this.gravatars[d.name] = Md5.hashStr(d.email);
			});
			console.log(this.gravatars);
		});
	}

	//Удаление пользователя админом
	onDestroy(user: User): void{
		this.homeService.destroyUser(user.id).subscribe(() => {
			this.users = this.users.filter(u => u !== user);
		});
	}
}