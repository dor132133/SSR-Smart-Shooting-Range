



import { Item } from './item';
import { TrainType } from 'src/enums';

export class Map extends Item{


  public name: string;
  public screenShot: string;
  public positions: string;
  public trainType: Object;
  public sizes: string;


  constructor(name: string, screenShot: string, positions: string,trainType: Object, sizes: string) {
    super();
    this.name = name;
    this.screenShot = screenShot;
    this.positions = positions;
    this.trainType = trainType;
    this.sizes = sizes;
   
  }


}
