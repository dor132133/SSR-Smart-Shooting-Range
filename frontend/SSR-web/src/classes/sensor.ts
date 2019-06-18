
import { Item } from './item';

export class Sensor extends Item{


    public id: number;
    public name: string;
    public icon: string
    public positionX: number;
    public positionY: number;
    public isCrossed: boolean;
    public crossTime: string;
    //need to add shot/coordinates of shot/ Mikbatz...
  
  
    constructor(id: number, positionX: number,positionY: number) {
      super();
      this.id = id;
      this.positionX = positionX;
      this.positionY = positionY;
      this.isCrossed = false;
      this.crossTime = '00:00:00'
    }

    
}