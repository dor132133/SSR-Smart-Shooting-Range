

import { Item } from './item';
import { JobType } from 'src/enums';

export class Warrior extends Item{

  public id: string;
  public firstname: string;
  public lastname: string;
  public age: number;
  public team: string;
  public  pic: string;
  public job: JobType
  public phone: string
  public rate: Number


  constructor(firstname: string, lastname: string,age: number, team: string,pic: string, job: JobType, phone: string) {
    super();
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
    this.pic = pic;
    this.job = job; 
    this.phone = phone; 
    this.rate = 0;
  }


}
