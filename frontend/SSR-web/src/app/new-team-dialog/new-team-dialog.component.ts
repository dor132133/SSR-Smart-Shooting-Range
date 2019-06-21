import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import { TeamsService } from '../teams.service';
import { MatDialogRef, MAT_DIALOG_DATA, ICON_REGISTRY_PROVIDER } from '@angular/material';
import { ErrorService } from '../error.service';
import { Team } from 'src/classes/team';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-new-team-dialog',
  templateUrl: './new-team-dialog.component.html',
  styleUrls: ['./new-team-dialog.component.scss']
})
export class NewTeamDialogComponent implements OnInit {


  teams
  icons = [environment.TEAMS_ICONS+'not-applicable.svg',environment.TEAMS_ICONS+'bullet.svg',
  environment.TEAMS_ICONS+'gun3.svg',environment.TEAMS_ICONS+'gun4.svg',environment.TEAMS_ICONS+'gun5.svg',
  environment.TEAMS_ICONS+'shooter.svg',environment.TEAMS_ICONS+'shooter2.svg',environment.TEAMS_ICONS+'sniper.svg',
  environment.TEAMS_ICONS+'sniper1.svg',environment.TEAMS_ICONS+'support.svg',environment.TEAMS_ICONS+'target.svg']
 
  newTeam = new Team('',0,this.icons[0],'');
  //Team(name: string, numOfMems: Number, pic: string, description: string): Team

  constructor(private teamsService: TeamsService,@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewTeamDialogComponent>, private errorService: ErrorService) {
     }

  ngOnInit() {
    this.teams = this.data.teams
  }

  checkFields(){
    if(this.newTeam.name.replace(' ','') == ''){this.errorService.openSnackBar('Please Enter a Name','Error')
     return false}
    if(this.newTeam.pic.replace(' ','') == ''){this.errorService.openSnackBar('Please Choose an Icon','Error')
    return false}
    if(this.newTeam.description.replace(' ','') == ''){this.errorService.openSnackBar('Please Enter description','Error')
    return false}
    if(this.teams.some(team=>{
      return (team as Team).name == this.newTeam.name
    })){this.errorService.openSnackBar('Team name already used','Error')
      return false}
    return true
  }

  AddNewTeam(){
    if(this.checkFields()){
      this.data = this.newTeam
      this.dialogRef.close(this.data);//close(data) can pass data back to the main page
    }
  }

  cancleButton(){
    this.dialogRef.close(false);//close(data) can pass data back to the main page
  }

}
