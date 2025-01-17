import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Member } from 'src/models/member';
import { AffecterEnseignantComponent } from '../affecter-enseignant/affecter-enseignant.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MemberService } from 'src/services/member.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-affecter-member',
  templateUrl: './affecter-member.component.html',
  styleUrls: ['./affecter-member.component.css']
})
export class AffecterMemberComponent implements OnInit{
  members : Member[] = []
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AffecterEnseignantComponent>,
    private MS: MemberService,
    private router: Router,
    ) {}


  ngOnInit(): void {
    this.MS.getMembers().subscribe((members)=>{this.members = members});
    this.form = this.fb.group({
      member: new FormControl(null, []),
    })
  }

  close(){
    this.dialogRef.close();
  }

  save(){

    this.dialogRef.close(this.form.value);

  }
}
