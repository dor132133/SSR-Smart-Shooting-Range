
import { Component, OnInit } from '@angular/core';
import { WarriorsService } from '../warriors.service';
import { TeamsService } from '../teams.service';
import { UsersService } from '../users.service';
import { Team } from 'src/classes/team';
import { ErrorService } from '../error.service';
import { User } from 'src/classes/user';
import { Warrior } from 'src/classes/warrior';
import { UserType, JobType } from 'src/enums';
import { MatDialog } from '@angular/material';
import { NewWarriorDialogComponent } from '../new-warrior-dialog/new-warrior-dialog.component';
import { NewTeamDialogComponent } from '../new-team-dialog/new-team-dialog.component';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {

  warriors = [];
  teams = [];
  users = [];
  showSpinner: boolean = false;

  constructor(private warriorsService: WarriorsService,private usersService: UsersService,
              private teamsService: TeamsService, private errorService: ErrorService,private dialog: MatDialog) { }

  ngOnInit() {
    this.getWarriors();
    this.getUsers();
    this.getTeams();
  }

  openNewTeamDialog(): void {
    const dialogRef = this.dialog.open(NewTeamDialogComponent, {
      width: '1500px',
            //data: {name: 'New Session', animal: this.animal} //pass data into the dialog
    });

  dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
     //console.log(result);
      if(result !== false)
        this.addTeam(result)
    });
  }

  openNewWarriorDialog(): void {
    const dialogRef = this.dialog.open(NewWarriorDialogComponent, {
      width: '1500px',
            //data: {name: 'New Session', animal: this.animal} //pass data into the dialog
    });

  dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      //console.log(result);
      if(result !== false){
        this.addWarrior(result)
        let query = JSON.parse(JSON.stringify({name : result.team}))//update the new warrior's team num of mems
        this.teamsService.getTeamByQuery(query,(team) => {
          var newTeam = <Team>JSON.parse(JSON.stringify(team));
           //console.log(team)
           //console.log(newTeam)
           newTeam.numOfMems +=1
          this.teamsService.updateTeam(team,newTeam, (data)=> {
            //console.log(data)
            this.getTeams()
          })
        })
      }
    });
  }

  getWarriors(){
    this.warriorsService.getWarriors((data) => {
      this.warriors = Object.values(data).filter(function(element){
        return element['empty']==undefined
      })
      //console.log(this.warriors)
    })
  }

  getTeams(){
    this.teamsService.getTeams((data) => {
      //console.log(data)
      this.teams = Object.values(data).filter(function(element){
        return element['empty']==undefined
      })
      //console.log(this.teams)
    })
  }

  getUsers(){
    this.usersService.getUsers((data) => {
      this.users = Object.values(data).filter(function(element){
        return element['empty']==undefined
      })
      //console.log(this.users)
    })
  }

  addTeam(team: Team){
    //var _this=this;
    this.showSpinner = true;
    this.teamsService.addTeam(team, (res) => {
      if(res.status == 200){
        this.getTeams()
      }
    this.showSpinner = false;
    })
  }

  addUser(){
    let user = new User("dor@gmail.com", '123',UserType.ADMIN,'');
    var _this=this;
    this.showSpinner = true;
    this.usersService.addUser(user, (res) => {
      if(res.status == 200)
        _this.getUsers()
    this.showSpinner = false;
    })
  }

  addWarrior(warrior: Warrior){
    var _this=this;
    this.showSpinner = true;
    this.warriorsService.addWarrior(warrior, (res) => {
      if(res.status == 200){
        _this.getWarriors()
        this.errorService.openSnackBar('New Warrior added!','Success') 
      }
    this.showSpinner = false;
    })
  }

















  // answer: string = '';
  // answerDisplay: string = '';
  // showSpinner: boolean = false;

  // showAnswer() {
  //   this.showSpinner = true;

  //   setTimeout(() => {
  //     this.answerDisplay = this.answer;
  //     this.showSpinner = false;
  //   }, 2000);
  // }

}
