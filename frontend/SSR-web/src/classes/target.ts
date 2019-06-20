


import { Item } from './item';
import { Shot } from './shot';

export class Target extends Item{


    public id: number;
    public name: string;
    public icon: string;
    public sernsorTrigger: number;
    public positionX: number;
    public positionY: number;
    public shooted: boolean;
    public shots: Array<Shot>;
    public density: number;
    public responseTime: number; //time gap from triggered to action
    public actionTime: number; //time gap from action to stop
    //need to add shot/coordinates of shot/ Mikbatz...
  
  
    constructor(id: number, positionX: number,positionY: number) {
      super();
      this.id = id;
      this.positionX = positionX;
      this.positionY = positionY;
      this.shooted = false;
      this.shots = [];
      this.density = 0;
    }

    
}
