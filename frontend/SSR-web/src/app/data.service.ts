import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public map: Object
  public warrior: Object
  public sensors: Object
  public targets: Object
  public chosenTarget: Object
  public trigerBySensorId: number
  public trigerResponseTime: number
  public trigerActionTime: number
  public spinnerCloseEvent: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  spinnerClose(){
    this.spinnerCloseEvent.emit(true)
  }


}
