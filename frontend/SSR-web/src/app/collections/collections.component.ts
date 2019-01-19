
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

  openNewWarriorDialog(): void {
    const dialogRef = this.dialog.open(NewWarriorDialogComponent, {
      width: '1500px',
            //data: {name: 'New Session', animal: this.animal} //pass data into the dialog
    });

  dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      console.log(result);
      if(result !== false)
        this.addWarrior(result.res)
    });
  }



  getWarriors(){
    this.warriorsService.getWarriors((data) => {
      this.warriors = Object.values(data);
      //console.log(this.warriors)
    })
  }

  getTeams(){
    this.teamsService.getTeams((data) => {
      this.teams = Object.values(data);
      //console.log(this.teams)
    })
  }

  getUsers(){
    this.usersService.getUsers((data) => {
      this.users = Object.values(data);
      //console.log(this.users)
    })
  }

  addTeam(){
    let team = new Team("Dicks",2,'','Special crazy unit...');
    var _this=this;
    this.showSpinner = true;
    this.teamsService.addTeam(team, (res) => {
      if(res.status == 200)
        _this.getTeams()
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
