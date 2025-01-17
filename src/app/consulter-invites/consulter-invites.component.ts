import { Component, Inject, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, CdkDrag, CdkDropList} from '@angular/cdk/drag-drop';
import { Member } from 'src/models/member';
import { MemberService } from 'src/services/member.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-consulter-invites',
  templateUrl: './consulter-invites.component.html',
  styleUrls: ['./consulter-invites.component.css'],
})
export class ConsulterInvitesComponent implements OnInit{

  members : Member[];

  constructor(private MS: MemberService, @Inject(MAT_DIALOG_DATA) public data: { eventId: number },
  private dialogRef: MatDialogRef<ConsulterInvitesComponent>, ){

  }
  ngOnInit(): void {
    this.MS.getMembersByEvent(this.data.eventId).subscribe(
      (members) => {
        this.members = members;
      }
    )
  }

  drop(event: CdkDragDrop<Member[]>) {
    moveItemInArray(this.members, event.previousIndex, event.currentIndex);
  }


  close(){
    this.dialogRef.close();
  }
}
