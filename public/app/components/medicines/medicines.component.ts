import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
	moduleId: module.id,
	selector: 'medicines',
	templateUrl: 'medicines.component.html',
	styleUrls: ['medicines.css']
})

export class MedicinesComponent {

	atcGroups = [
		{
			code: 'A',
			path: '/medicines1/A',
			title: 'Пищеварительный тракт и обмен веществ'
		},
		{
			code: 'B',
			path: '/medicines/B',
			title: 'Кроветворение и кровь'
		},
		{
			code: 'C',
			path: '/medicines/C',
			title: 'Сердечно-сосудистая система'
		},
		{
			code: 'D',
			path: '/medicines/D',
			title: 'Дерматологические препараты'
		},
		{
			code: 'G',
			path: '/medicines/G',
			title: 'Mочеполовая система и половые гормоны'
		},
		{
			code: 'H',
			path: '/medicines/H',
			title: 'Гормональные препараты для системного использования, исключая половые гормоны'
		},
		{
			code: 'J',
			path: '/medicines/J',
			title: 'Противомикробные препараты для системного применения'
		},
		{
			code: 'L',
			path: '/medicines/L',
			title: 'Противоопухолевые препараты и иммуномодуляторы'
		},
		{
			code: 'M',
			path: '/medicines/M',
			title: 'Костно-мышечная система'
		},
		{
			code: 'N',
			path: '/medicines/N',
			title: 'Нервная система'
		},
		{
			code: 'P',
			path: '/medicines/P',
			title: 'Противопаразитарные препараты, инсектициды и репелленты'
		},
		{
			code: 'R',
			path: '/medicines/R',
			title: 'Дыхательная система'
		},
		{
			code: 'S',
			path: '/medicines/S',
			title: 'Органы чувств'
		},
		{
			code: 'V',
			path: '/medicines/V',
			title: 'Прочие препараты'
		}
	]

	constructor(title: Title){
	//	title.setTitle('Поиск лекарств');
	}

}