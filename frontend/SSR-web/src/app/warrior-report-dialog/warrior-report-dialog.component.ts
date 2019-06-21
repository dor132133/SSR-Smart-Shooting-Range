import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CollectionsComponent } from '../collections/collections.component';
import { SessionsService } from '../sessions.service';
import { TeamsService } from '../teams.service';
import { SessionReportDialogComponent } from '../session-report-dialog/session-report-dialog.component';

@Component({
  selector: 'app-warrior-report-dialog',
  templateUrl: './warrior-report-dialog.component.html',
  styleUrls: ['./warrior-report-dialog.component.scss']
})
export class WarriorReportDialogComponent implements OnInit {

  warrior
  warriorSessions = []
  warriorTeam =''

  constructor(public dialogRef: MatDialogRef<CollectionsComponent>,private dialog: MatDialog, public sessionsService: SessionsService, public teamsService: TeamsService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.warrior = this.data.warrior
    //console.log('Warrior: ', this.warrior)
    this.initWarriorSessions()
    this.getWarriorTeam()
  }

  getWarriorTeam(){
    var query = JSON.parse(JSON.stringify({name: this.warrior.team})) 
    this.teamsService.getTeamByQuery(query, team=>{
      //console.log('team: ', team)
      this.warriorTeam = team
    })
  }


  initWarriorSessions(){
    this.sessionsService.getSessionsByWarrior(this.warrior, sessions=>{
      this.sessionsService.sessionsToListing(sessions,warriorSessions=>{
        //console.log(warriorSessions)
        this.warriorSessions = warriorSessions
      })
    })
  }


  openSessionReportDialog(session): void {
    console.log('session clicked')
    const dialogRef = this.dialog.open(SessionReportDialogComponent, {
      width: '1500px',
            data: {session: session} //pass data into the dialog
    });

  dialogRef.afterClosed().subscribe(result => { 
      
      //console.log(result);
      if(result == false)
        return
    });
  }


  close(flag: boolean){
    let data;
    if(!flag){
      this.dialogRef.close(flag);
      return
    }
    this.dialogRef.close(data);
  }



}
