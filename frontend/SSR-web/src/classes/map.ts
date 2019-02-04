






import { Item } from './item';
import { Sensor } from './sensor';
import { Target } from './target';

export class Map extends Item{

  public _id: string
  public trainName: string;
  public icon: string;
  public screenShot: string;
  public sensors;
  public targets;
  public walls;
  public width: number;
  public length: number;


  constructor(trainName: string, icon: string, width: number,length: number) {
    super();
    this.trainName = trainName;
    this.icon = icon;
    this.width = width;
    this.length = length;
    this.targets = []
    this.sensors = []
    this.walls = []
  }


}
