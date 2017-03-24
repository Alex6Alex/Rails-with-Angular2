export class User {

  constructor(
  	public id: number,
    public name: string,
    public email: string,
    public phone: string,
    public password: string,
    public password_confirmation: string,
    public admin: boolean
  ) {  }

}