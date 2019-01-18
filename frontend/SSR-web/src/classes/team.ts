

  import { Item } from './item';


  export class Team extends Item{

    public id: string;
    public name: string;
    public numOfMems: Number;
    public rate: Number;
    public pic: string;
    public description: string;
  
  
    constructor(name: string,numOfMems: Number, pic: string,description: string) {
      super();
      this.id = '0001';
      this.name = name;
      this.numOfMems = numOfMems;
      this.pic = pic;
      this.description = description;
      this.rate = 80;
    }
  
  }