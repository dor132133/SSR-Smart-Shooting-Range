import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StopwatchService {
 
  counter: number;
  timerRef;
  running: boolean = false;
  public startText = 'Start'; //start/stop/resume button text
  millis;
  seconds;
  minutes;
  public currentTimeString = '00:00:00';
  timeOut //(optional) timeOut in minutes

  constructor() { }//DON'T FORGET TO clearInterval(this.timerRef); IN THE END

  startTimer() {
    this.running = !this.running;
    if (this.running) {
      this.startText = 'Stop';
      const startTime = Date.now() - (this.counter || 0);
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;
        this.ElapsedTimeString()
      });
    } else {
      this.startText = 'Resume';
      clearInterval(this.timerRef);
    }
  }

  clearTimer() {
    this.running = false;
    this.startText = 'Start';
    this.counter = undefined;
    this.currentTimeString = '00:00:00';
    clearInterval(this.timerRef);
  }

  ElapsedTimeString() {
    function pretty_time_string(num) {
      return (num < 10 ? "0" : "") + num;
    }

    this.millis = this.counter % 1000;

    this.seconds = Math.floor(this.counter / 1000)

    this.minutes = Math.floor(this.seconds / 60);

    let millis = pretty_time_string(this.millis);
    let seconds = pretty_time_string(this.seconds % 60);
    let minutes = pretty_time_string(this.minutes);

    if( this.timeOut!==undefined && this.minutes == this.timeOut)//timeOut in minutes
      this.clearTimer()

    this.currentTimeString = minutes + ":" + seconds + ":" + millis;

  }

  gapTime(lastTime, newTime){
    var splittedTime = lastTime.split(':')
    var time1 = parseFloat(splittedTime[0] + '.' + splittedTime[1]+splittedTime[2]);
    var splittedTime = newTime.split(':')
    var time2 = parseFloat(splittedTime[0] + '.' + splittedTime[1]+splittedTime[2]);

    // console.log('time1', time1)
    // console.log('time2', time2)

    // 0.02293

    try{
      var gapTime = (time2-time1).toString()
      var splittedGapTime = gapTime.split('.')
      var min = splittedGapTime[0];
      var sec = splittedGapTime[1].slice(0,2);
      var milli = splittedGapTime[1].slice(2,4);
    }
    catch(e){
      return '00:00:00'
    }
    // console.log('gapTime:' ,min + ':' + sec +':' + milli)
    
    return min + ':' + sec +':' + milli
  }

}
