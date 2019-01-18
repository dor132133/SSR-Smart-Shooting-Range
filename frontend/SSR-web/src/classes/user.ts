

import { Item } from './item';
import { UserType } from 'src/enums';


  export class User extends Item{

    public id: string;
    public email: string;
    public password: string;
    public type: UserType;
    public pic: string;
  
  
    constructor(email: string,password: string,type: UserType, pic: string) {
      super();
      this.id = '0001';
      this.email = email;
      this.type = type;
      this.password = password;
      this.pic = pic;
    }
  
  
  }