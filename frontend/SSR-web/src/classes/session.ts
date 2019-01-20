
import { Map } from './map'
import { Shot } from './shot'
import { Warrior } from './warrior'
import { Item } from './item';

export class Session extends Item{

  public mapId: string;
  public date: Date;
  public pic: string;
  public warriorId: string;
  public times: Array<Shot>;


  constructor(mapId: string, date: Date,warriorId: string, pic: string, times: Array<Shot>) {
    super();
  
    this.mapId = mapId;
    this.date = date;
    this.warriorId = warriorId;
    this.times = times;
    this.pic = pic;
  }


}