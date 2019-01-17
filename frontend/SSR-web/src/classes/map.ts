



import { Item } from './item';
import { TrainType } from 'src/enums';

export class Map extends Item{

  public id: string;
  public screenShot: string;
  public positions: string;
  public trainType: TrainType;
  public sizes: string;


  constructor(screenShot: string, positions: string,trainType: TrainType, sizes: string) {
    super();
    this.id = '0001';
    this.screenShot = screenShot;
    this.positions = positions;
    this.trainType = trainType;
    this.sizes = sizes;
   
  }


}
