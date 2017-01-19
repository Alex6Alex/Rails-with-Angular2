import { Component, OnInit } from '@angular/core';

import { HomeService } from '../../services/home.service';

@Component({
	moduleId: module.id,
	selector: 'home',
	templateUrl: 'home.component.html',
	styleUrls: ['home.css']
})

export class HomeComponent implements OnInit { 
	title: string;

	constructor(private homeService: HomeService){
	}

	getData(): void{
		this.homeService.getData().subscribe(data => {
			this.title = data;
		});
	}

	ngOnInit(): void{
		this.getData();
	}
}