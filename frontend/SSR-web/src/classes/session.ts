
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
  public score: number;
  public sensorsEventsFlow
  public targetsEventsFlow


  constructor(mapId: string, date: number,warriorId: string, pic: string, totalTime: string,score: number) {
    super();
  
    this.mapId = mapId;
    this.date = date;
    this.warriorId = warriorId;
    this.totalTime = totalTime;
    this.pic = pic;
    this.sensorsEventsFlow = []
    this.targetsEventsFlow = []
    this.score = score;
  }


}