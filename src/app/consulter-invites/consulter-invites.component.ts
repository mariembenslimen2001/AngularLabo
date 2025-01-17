import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-consulter-invites',
  templateUrl: './consulter-invites.component.html',
  styleUrls: ['./consulter-invites.component.css']
})
export class ConsulterInvitesComponent implements OnInit {
  members: any[] = [];

  constructor(
    private MS: MemberService,
    private dialogRef: MatDialogRef<ConsulterInvitesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { eventId: number }
  ) {}

  ngOnInit(): void {
    this.MS.getMembersByEvent(this.data.eventId).subscribe(members => {
      this.members = this.removeDuplicates(members);
    });
  }

  removeDuplicates(members: any[]): any[] {
    const uniqueMembers = [];
    const memberIds = new Set();

    for (const member of members) {
      if (!memberIds.has(member.id)) {
        uniqueMembers.push(member);
        memberIds.add(member.id);
      }
    }

    return uniqueMembers;
  }

  close(): void {
    this.dialogRef.close();
  }
}