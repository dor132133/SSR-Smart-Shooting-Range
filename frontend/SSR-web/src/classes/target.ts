


import { Item } from './item';

export class Target extends Item{


    public id: number;
    public sernsorTrigger: number;
    public positionX: number;
    public positionY: number;
    public shooted: boolean;
    //need to add shot/coordinates of shot/ Mikbatz...
  
  
    constructor(id: number, sernsorTrigger: number, positionX: number,positionY: number) {
      super();
      this.id = id;
      this.sernsorTrigger = sernsorTrigger;
      this.positionX = positionX;
      this.positionY = positionY;
      this.shooted = false;
    }

    
}
