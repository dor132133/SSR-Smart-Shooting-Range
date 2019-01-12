



import { Item } from './item';

export class SSRMap extends Item{

  public id: string;
  public screenShot: object;
  public positions: string;
  public trainType: TrainType;
  public sizes: string;


  constructor(screenShot: object, positions: string,trainType: TrainType, sizes: string) {
    super();
    this.screenShot = screenShot;
    this.positions = positions;
    this.trainType = trainType;
    this.sizes = sizes;
   
  }


}
