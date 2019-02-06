
import { Map } from './map'
import { Shot } from './shot'
import { Warrior } from './warrior'
import { Item } from './item';

export class Session extends Item{

  public mapId: string;
  public date: number;
  public pic: string;
  public warriorId: string;
  public totalTime: string;


  constructor(mapId: string, date: number,warriorId: string, pic: string, totalTime: string) {
    super();
  
    this.mapId = mapId;
    this.date = date;
    this.warriorId = warriorId;
    this.totalTime = totalTime;
    this.pic = pic;
  }


}