import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { HomeService } from './services/home.service';

@Component({
	moduleId: module.id,
  	selector: 'my-app',
  	encapsulation: ViewEncapsulation.None,
  	templateUrl: 'app.component.html',
  	styleUrls: ['../styles.css'],
  	providers: [ HomeService ]
})

export class AppComponent {
	selectedLink: string;
	//router: Router;

	constructor(private router: Router, private titleService: Title){
		//this.router = _router;
	}

	setTitle(title: string){
		this.titleService.setTitle(title);
	};
}