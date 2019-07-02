import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatBottomSheet } from '@angular/material';
import { WebSocketService } from '../websocket.service';
import { Session } from 'src/classes/session'
import { DataService } from '../data.service';
import { Target } from 'src/classes/target';
import { Map } from 'src/classes/map';
import { Warrior } from 'src/classes/warrior';
import { Sensor } from 'src/classes/sensor';
import { MapService } from '../map.service';
import { ErrorService } from '../error.service';
import { TargetConfigureSheetComponent } from '../target-configure-sheet/target-configure-sheet.component';
import { StopwatchService } from '../stopwatch.service';
import { SessionsService } from '../sessions.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss'],
  animations: []
})
export class SessionComponent implements OnInit {

  style_flag = false;
  ICONS_PATH = 'assets/icons_elements/'
  warriorIcon = this.ICONS_PATH + 'warrior.svg';
  warriorIconName = 'warrior';
  sensorIconName = 'sensor';
  targetIconName = 'target';
  session: Session
  warrior: Warrior
  map: Map
  movedWalls: Array<HTMLElement> = []
  startFlag: boolean = false
  showSpinner: boolean = false;
  espConnectionFlag: boolean = false;
  screenShot;
  date = Date.now()
  sensorsEventsFlow = []
  targetsEventsFlow = []
  sessionScore: number
  socketClient = webSocket({
    url: 'ws://192.168.14.184',
    deserializer: msg => msg
  });
  socketListenerFlag: boolean = false;
  sensorLastTimestamp = '00:00:00'
  targetLastTimestamp = '00:00:00'

  constructor(private router: Router, private dataService: DataService, private mapService: MapService,
    private sessionService: SessionsService,
    private errorService: ErrorService, private bottomSheet: MatBottomSheet, private stopWatch: StopwatchService,
    private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private webSocketService: WebSocketService) {
  }

  ngOnInit() {
    this.warrior = <Warrior>this.dataService.warrior;
    this.map = JSON.parse(JSON.stringify(this.dataService.map))//copy object, instead of two pointers of one object.
    //this.screenShot = getScreenShot
    console.log(this.warrior)
    console.log(this.map)

    var score=Math.random() * (10 - 0) + 0
    score = parseFloat(score.toFixed(2));
    this.sessionScore = score
    

    // this.sensorsEventsFlow.push({eventGapTime:'2.54',sensorId: this.map.sensors[0].id,crossTime: '2:54'})
    // this.sensorsEventsFlow.push({eventGapTime:'4.56',sensorId: this.map.sensors[1].id,crossTime: '7:10'})
    // this.sensorsEventsFlow.push({eventGapTime:'9.21',sensorId: this.map.sensors[2].id,crossTime: '6:32'})
    // this.targetsEventsFlow.push({
    //   eventGapTime:'3.21',
    //   targetId: this.map.targets[0].id,
    //   time: '3:21',
    //   coords: JSON.stringify({radius: 5, degree: 40})
    // })
    // this.map.targets[0].shots.push({time :'3:21',coordinates: JSON.stringify({radius: 5, degree: 40})})

    // this.targetsEventsFlow.push({
    //   eventGapTime:'5.21',
    //   targetId: this.map.targets[1].id,
    //   time: '8:42',
    //   coords: JSON.stringify({radius: 5, degree: 40})
    // })
    // this.map.targets[1].shots.push({time :'8:42',coordinates: JSON.stringify({radius: 2, degree: 170})})

    // this.targetsEventsFlow.push({
    //   eventGapTime:'11.51',
    //   targetId: this.map.targets[2].id,
    //   time: '19:93',
    //   coords: JSON.stringify({radius: 5, degree: 40})
    // })
    // this.map.targets[2].shots.push({time :'19:93',coordinates: JSON.stringify({radius: 1, degree: 270})})
    
  }

  //check if all targets are configured, if true -> connect()
  preConnect(){
    if(this.map.targets.some(target =>{
      return target.actionTime == undefined || target.responseTime == undefined || target.sernsorTrigger == undefined 
    }))
      this.errorService.openSnackBar('Targets are not configure', 'Error');
    else
      this.connect();
  }
 
  startPauseResumeButton() {
    if(!this.espConnectionFlag){
      this.errorService.openSnackBar('Esp not connected', '')
      return
    } 
    if (!this.startFlag) {
      this.startFlag = true;
      this.socketListenerFlag = true;
      this.start()
      return
    }
    if (this.stopWatch.startText == 'Stop'){
      this.socketListenerFlag = false;
      this.pause();
    }
    else if (this.stopWatch.startText == 'Resume'){
      this.socketListenerFlag = true;
      this.resume();
    }
  }

  connect(){
    // let mySessionData: JSON = this.createSessionJsonData();
    this.errorService.spinnerOn('Connecting to ESP...');
    this.socketClient.subscribe(
      (message) => {// Called whenever there is a message from the server.
        if(message.data.includes('hello')){
          this.espConnectionFlag=true;
          console.log('connected')
          this.errorService.openSnackBar(message.data , 'Event')
          console.log(message.data) 
        }
        else if(this.socketListenerFlag == true && message.data.includes('target'))
          this.targetHitted(message.data)
        
        else if(this.socketListenerFlag == true && message.data.includes('sensor'))
          this.sernsorCrossed(message.data)

        this.errorService.spinnerOff()
      },
      (err) => {// Called if at any point WebSocket API signals some kind of error.
        console.error(err)
        this.errorService.openSnackBar(err, 'Error')
        this.errorService.spinnerOff()
      },
      () => {// Called when connection is closed (for whatever reason).
        console.warn('Connection closed!')
        this.errorService.openSnackBar('Connection closed!', 'Event')
        this.errorService.spinnerOff()
      }
    );

  }

  sendMsgSocket(msg:string){
    this.socketClient.next(JSON.parse(JSON.stringify(msg)));
    this.socketClient.next(JSON.parse(JSON.stringify(msg)));
  }

  // Closes the connection 
  closeSocket(){
    console.log('Close')
    this.socketClient.complete(); 
  }

  //Depricated
  connectOld(){
    // let mySessionData: JSON = this.createSessionJsonData();
    this.errorService.spinnerOn('Connecting to ESP...');
    this.webSocketService.serviceGateWay('connect',res=> {
      var _this = this;
      setTimeout(function(){
        if(res=='hello'){
        _this.espConnectionFlag=true;
        console.log('connected')
        }
        else{
          console.log('failed to connect')
          _this.errorService.openSnackBar('Failed to connect, try again', 'Error')
        }
        _this.errorService.spinnerOff()
      }, 1000)
    })
  }

  start(){
    this.errorService.spinnerOn('Starting session...');
    // this.webSocketService.serviceGateWay('start',res=> {
      var _this = this;
      setTimeout(function(){
      //  if(res=='start'){
          console.log('start')
          _this.stopWatch.startTimer(); 
        // }
        // else{
        //   console.log('Failed to start')
        //   _this.errorService.openSnackBar('Failed to start, try again', 'Error')
        // }
        _this.errorService.spinnerOff()
      }, 1000)
    // })
  }

  pause() {
    this.errorService.spinnerOn('Pausing session...');
    this.webSocketService.pauseSession(res => {
      //console.log(res)
      if (res.status == 200) {
        var _this = this;
        setTimeout(function(){
          _this.errorService.spinnerOff()
          _this.stopWatch.startTimer();
        }, 100)
      }
    })
  }

  resume() {
    this.errorService.spinnerOn('Resuming session...');
    this.webSocketService.resumeSession(res => {
      //console.log(res)
      if (res.status == 200) {
        var _this = this;
        setTimeout(function(){
          _this.errorService.spinnerOff()
          _this.stopWatch.startTimer();
        }, 500)
      }
    })
  }

  finish() {
    //if clock running => pause:
    if (this.stopWatch.startText == 'Stop'){
          this.stopWatch.startTimer()
          this.socketListenerFlag = false;
    }

    //if clock already paused:
    this.errorService.openMessage('Finish Session', 'Are you sure?', (choice) => {
      if (choice == false) 
        return

      //choice == true => finish!
      this.sendMsgSocket('finish')
      console.log('finish')
      this.saveElementsPositions((res) => {
        if (res == false) {
          this.errorService.openSnackBar('Failed to save map positions','Error');
          return
        } 
          
        this.session = new Session(this.map._id, this.date, this.warrior._id, this.screenShot, this.stopWatch.currentTimeString,this.sessionScore)
        this.session.sensorsEventsFlow = this.sensorsEventsFlow;
        //console.log('tragetsFlow: ', this.targetsEventsFlow)
        this.session.targetsEventsFlow = this.targetsEventsFlow;
        //console.log(this.session)
        this.sessionService.addSession(this.session, (res) => {
          if (res.status == 200) {
            //console.log(res.sessionId)
            this.errorService.openSnackBar('New Session added!', 'Success')
            this.exit()
          }
        })//addSession
      })//saveElementsPositions
    })//dialog


  }

  exit() {
    this.router.navigate(['/sessions']).then((e) => {
      if (e) {
        this.stopWatch.clearTimer()
        //console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }

  resetMap() {
    this.errorService.openMessage('Reset map positions', 'Are you sure?', (choice) => {
      if (choice == false)
        return
      this.map.walls.forEach(element => {
        element.positionX = undefined
        element.positionY = undefined
      })
      this.map.targets.forEach(element => {
        element.positionX = undefined
        element.positionY = undefined
      })
      this.map.sensors.forEach(element => {
        element.positionX = undefined
        element.positionY = undefined
      })
    })

  }

  setMovedElement(nodeElements) {
    let exist;
    for (let i = 0; nodeElements[i]; i++) {
      if ((nodeElements[i] as HTMLElement).style.transform !== "") {//if moved
        exist = false;
        for (let j = 0; this.movedWalls[j]; j++)
          if (this.movedWalls[j].id == nodeElements[i].id)//if already exist in movedArray
            exist = true;

        if (!exist)
          this.movedWalls.push(nodeElements[i])//in moved && not exist => push
        console.log(this.movedWalls)
      }

    }
    return nodeElements
  }

  saveElementsPositions(callback: (res) => void) {

    this.setMovedElement(document.querySelectorAll('.boundary-wall-element'))
    this.setMovedElement(document.querySelectorAll('.sub-boundary-wall-element'))

    let targetElements = document.querySelectorAll('.target-element')
    let sensorElements = document.querySelectorAll('.sensor-element')

    var parentPosition = document.querySelector('.border-reset').getBoundingClientRect();

    this.movedWalls.forEach(element => {
      for (let i = 0; i < this.map.walls.length; i++) {
        if (this.map.walls[i].id == element.id) {
          let tmpX = element.getBoundingClientRect().left
          let tmpY = element.getBoundingClientRect().top
          //console.log('wall' + element.id + ':  x: ' + (tmpX - parentPosition.left)+ ' y: ' + (tmpY - parentPosition.top))
          this.map.walls[i].positionX = tmpX - parentPosition.left
          this.map.walls[i].positionY = tmpY - parentPosition.top
          break;
        }
      }
    })

    targetElements.forEach(element => {
      for (let i = 0; i < this.map.targets.length; i++) {
        if (this.map.targets[i].id == element.id) {
          let tmpX = element.getBoundingClientRect().left
          let tmpY = element.getBoundingClientRect().top
          //console.log('target' + element.id + ':  x: ' + (tmpX - parentPosition.left)+ ' y: ' + (tmpY - parentPosition.top))
          this.map.targets[i].positionX = tmpX - parentPosition.left
          this.map.targets[i].positionY = tmpY - parentPosition.top
          break;
        }
      }
    })

    sensorElements.forEach(element => {
      for (let i = 0; i < this.map.sensors.length; i++) {
        if (this.map.sensors[i].id == element.id) {
          let tmpX = element.getBoundingClientRect().left
          let tmpY = element.getBoundingClientRect().top
          //console.log('sensor' + element + ':  x: ' + (tmpX - parentPosition.left)+ ' y: ' + (tmpY - parentPosition.top))
          this.map.sensors[i].positionX = tmpX - parentPosition.left
          this.map.sensors[i].positionY = tmpY - parentPosition.top
          break;
        }
      }
    })

    //console.log(this.map)
    this.mapService.updateMap(<Map>this.dataService.map, this.map, (res) => {
      if (res.status == 200) {
        callback(true)
        return
      }
      this.errorService.openSnackBar('Error accoured while updating the map', 'Try again')
      callback(false)
    })

  }

  openBottomSheet(chosenTarget: Target): void {
    this.dataService.sensors = this.map.sensors
    this.dataService.chosenTarget = chosenTarget
    const bottomSheetRef = this.bottomSheet.open(TargetConfigureSheetComponent);
    bottomSheetRef.afterDismissed().subscribe(() => {
      if (this.dataService.trigerBySensorId !== undefined && this.dataService.trigerActionTime !== undefined && this.dataService.trigerResponseTime !== undefined) {
        chosenTarget.sernsorTrigger = this.dataService.trigerBySensorId;
        chosenTarget.actionTime = this.dataService.trigerActionTime;
        chosenTarget.responseTime = this.dataService.trigerResponseTime;
        let massege = 'Targer #' + chosenTarget.id + ' trigger by sensor #' + this.dataService.trigerBySensorId;
        console.log(massege);
        console.log('Response time: ' + chosenTarget.responseTime + 'seconds')
        console.log('Action time: ' + chosenTarget.actionTime + 'seconds')
        //console.log(this.map)
        this.errorService.openSnackBar(massege, '')
      }
      else {
        this.errorService.openSnackBar('Target does not configure', '')
        console.log('Target does not configure')
      }
    });
  }

  createSessionJsonData(): JSON{
    let sessionData = JSON.parse(JSON.stringify({
      session: 5
    }))
    return sessionData;
  }
  
  targetHitted(message){
    var timestamp = this.stopWatch.currentTimeString
    var gapTime = this.stopWatch.gapTime(this.targetLastTimestamp,timestamp)
    this.targetLastTimestamp = timestamp
    console.log('target GapTime:',gapTime)
    this.errorService.openSnackBar(message , '+'+gapTime) 
  
    this.targetsEventsFlow.push({
      eventGapTime: gapTime,
      targetId: this.map.targets[0].id,
      time: timestamp,
      coords: JSON.stringify({radius: 5, degree: 40})
    })
    this.map.targets[0].shots.push({time :timestamp,coordinates: JSON.stringify({radius: 5, degree: 40})})
  }

  sernsorCrossed(message){
    var timestamp = this.stopWatch.currentTimeString
    var gapTime = this.stopWatch.gapTime(this.sensorLastTimestamp,timestamp)
    this.sensorLastTimestamp = timestamp
    console.log('sensor GapTime:',gapTime)
    this.errorService.openSnackBar(message , '+'+gapTime) 
    this.sensorsEventsFlow.push({eventGapTime:gapTime,sensorId: this.map.sensors[0].id,crossTime: timestamp})
  }



}


