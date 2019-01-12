

import { Item } from './item';

export class Warrior extends Item{

  public id: string;
  public firstname: string;
  public lastname: string;
  public age: number;
  public team: string;
  public  pic: string;
  public job: JobType


  constructor(firstname: string, lastname: string,age: number, team: string,pic: string, job: JobType) {
    super();
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
    this.pic = pic;
    this.job = job; 
  }


}
