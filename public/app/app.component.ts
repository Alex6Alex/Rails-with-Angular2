import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { HomeService } from './services/home.service';
import { SessionService } from './services/session.service';
import { PharmacyService } from './services/pharmacy.service';
import { MedicineService } from './services/medicine.service';
import { PriceService } from './services/price.service';

import { Md5 } from 'ts-md5/dist/md5';

@Component({
	moduleId: module.id,
  	selector: 'my-app',
  	encapsulation: ViewEncapsulation.None,
  	templateUrl: 'app.component.html',
  	styleUrls: ['../styles.css'],
  	providers: [ HomeService, SessionService, PharmacyService, MedicineService, PriceService ]
})

export class AppComponent implements OnInit {
	//вошел пользователь или нет
	sign: boolean;
	admin: boolean;
	//атрибуты пользователя
	public user = { id: null, name: null, gravatar: null };

	constructor(private router: Router, private titleService: Title,
		private sessionService: SessionService){}

	//заголовки
	public setTitle(title: string){
		this.titleService.setTitle(title);
	};
	
	//узнать, в сети ли пользователь
	ngOnInit(){
		this.isSignIn();
		this.signState();
	}

	signState(){
		this.sessionService.signInState.subscribe(status => {
			this.sign = status;
		});
		this.sessionService.isAdmin.subscribe(admin => {
			this.admin = admin;
		});
	}

	//связь между компонентами
	signInState(value: boolean){
		this.sessionService.signInState.next(value);
	}

	//проверка на админ
	isAdmin(value: boolean){
		this.sessionService.isAdmin.next(value);
	}

	//в сети ли пользователь?
	isSignIn(): void{
		this.sessionService.isSignIn().subscribe(data => {
			if(data.sign){
				//user in system
				this.sign = data.sign;
				this.user.id = data.user.id;
				this.user.name = data.user.name;
				this.user.gravatar = Md5.hashStr(data.user.email);

				this.admin = data.user.admin;

				this.signInState(true);
				this.isAdmin(this.admin);
			}
		});
	}

	//выход
	logOut(): void{
		this.sessionService.logOut(this.user.id).subscribe(data => {
			this.sign = false;
			this.admin = false;

			this.signInState(false);
			this.isAdmin(false);
		});
	}
}