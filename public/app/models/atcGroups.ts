export class Group {

  	constructor(
    	public id: number,
    	public code: string,
    	public description: string
  	) {  }

}

export class SubGroup {

	constructor(
	  	public id: number,
	  	public code: string,
		public description: string
	) {  }

}

export class Medicine{

	constructor(
		public id: number,
		public name: string,
		public form: string,
		public pack: string,
		public comment: string,
		public atc_sub_group_id: number
	) { }

}