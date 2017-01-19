import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
	moduleId: module.id,
	selector: 'medicines',
	templateUrl: 'medicines.component.html'
})

export class MedicinesComponent {

	constructor(title: Title){
	//	title.setTitle('Поиск лекарств');
	}

}