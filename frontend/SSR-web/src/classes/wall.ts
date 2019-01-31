

import { Item } from './item';

export class Wall extends Item{

  public id: string;
  public name: string;
  public positionX: string;
  public positionY: string;
  public icon: string;


  constructor(id: string ,name: string,icon: string) {
    super();
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.positionX = undefined;
    this.positionY = undefined;
  }

}