import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Member } from 'src/models/member';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-consulter-member',
  templateUrl: './consulter-member.component.html',
  styleUrls: ['./consulter-member.component.css']
})
export class ConsulterMemberComponent implements OnInit{
  member : Member;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { toolId: number },
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ConsulterMemberComponent>,
    private MS: MemberService,
    private router: Router,

    ) {

    }


  ngOnInit(): void {

    const toolId = this.data.toolId;

    // Now you can use toolId to fetch the member
    this.MS.getMemberByOutil(toolId).subscribe((member) => {
      this.member = member;
    });
  }

  close(){
    this.dialogRef.close();
  }

 

}
