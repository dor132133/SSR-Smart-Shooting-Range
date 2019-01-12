
import { Map } from './map'
import { Shot } from './shot'
import { Warrior } from './warrior'
import { Item } from './item';

export class Session extends Item{

  public id: string;
  public map: Map;
  public date: Date;
  public warrior: Warrior;
  public times: Array<Shot>;


  constructor(map: Map, date: Date,warrior: Warrior, times: Array<Shot>) {
    super();
    this.map = map;
    this.date = date;
    this.warrior = warrior;
    this.times = times;
   
  }


}