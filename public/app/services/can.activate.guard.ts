import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,
		RouterStateSnapshot} from '@angular/router';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';

import { SessionService } from './session.service'

@Injectable()
export class CanActivateGuard implements CanActivate {
	constructor(private sessionService: SessionService) {}

	canActivate(route: ActivatedRouteSnapshot,
				state: RouterStateSnapshot): 
				Observable<boolean>|Promise<boolean>|boolean{
		let admin;
		this.sessionService._isAdmin.then((data) => {
			admin = data;
		});
		return admin;
		//console.log('ffff');
		//return true;
	}
}