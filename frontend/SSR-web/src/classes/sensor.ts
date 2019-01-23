
import { Item } from './item';

export class Sensor extends Item{


    public id: number;
    public positionX: number;
    public positionY: number;
    public crossed: boolean;
    //need to add shot/coordinates of shot/ Mikbatz...
  
  
    constructor(id: number, positionX: number,positionY: number) {
      super();
      this.id = id;
      this.positionX = positionX;
      this.positionY = positionY;
      this.crossed = false;
    }

    
}