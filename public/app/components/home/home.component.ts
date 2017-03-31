import { Component, OnInit } from '@angular/core';

import { SessionService } from '../../services/session.service';
import { AppComponent } from '../../app.component';

import { Md5 } from 'ts-md5/dist/md5';

@Component({
	moduleId: module.id,
	selector: 'home',
	templateUrl: 'home.component.html',
	styleUrls: ['home.css']
})

export class HomeComponent implements OnInit { 
	//модель для входа
	session = {email: null, password: null};
	//проверка входа и админа
	sign: boolean;
	admin: boolean;
	//атрибуты пользователя
	user = { id: null, name: null, gravatar: null }
	//эл. почта
	pattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$";
	//указать ошибки, если они есть
	errorLog = false;

	constructor(private sessionService: SessionService, 
				private appComponent: AppComponent){}

	ngOnInit(): void{
		this.sessionService.isSignIn().subscribe(data => {
			if(data.sign){
				
				this.sign = data.sign;
				this.user.id = data.user.id;
				this.user.name = data.user.name;
				this.user.gravatar = Md5.hashStr(data.user.email);

				this.admin = data.user.admin;
				
				this.signInState(true);
				this.isAdmin(this.admin);

				this.signState();
			}
			else{
				this.signState();
			}
		});
	}
	
	onSubmit(): void{
		this.signIn();
	}

	signInState(value: boolean){
		this.sessionService.signInState.next(value);
	}

	//определение админа
	isAdmin(value: boolean){
		this.sessionService.isAdmin.next(value);
	}

	//если вышел
	signState(){
		this.sessionService.signInState.subscribe(status => {
			this.sign = status;
		});
		this.sessionService.isAdmin.subscribe(admin => {
			this.admin = admin;
		});
	}

	//вход
	signIn(): void{
		this.sessionService.signIn(this.session).subscribe(data => {
			this.sign = true;
			console.log(data);
			
			this.errorLog = false;
			
			this.user.id = data.id;
			this.user.name = data.name;
			this.user.gravatar = Md5.hashStr(data.email);

			this.appComponent.user = this.user;

			this.admin = data.admin;

			this.signInState(true);
			this.isAdmin(this.admin);
		}, 
		error => {
			this.errorLog = true;
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