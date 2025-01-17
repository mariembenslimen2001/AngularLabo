import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Member } from 'src/models/member';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-affecter-enseignant',
  templateUrl: './affecter-enseignant.component.html',
  styleUrls: ['./affecter-enseignant.component.css']
})
export class AffecterEnseignantComponent implements OnInit {
  enseignants : Member[] = []
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AffecterEnseignantComponent>,
    private MS: MemberService,
    private router: Router,
    ) {}


  ngOnInit(): void {
    this.MS.getEnseignants().subscribe((members)=>{this.enseignants = members});
    this.form = this.fb.group({
      encadrant: new FormControl(null, []),
    })
  }

  close(){
    this.dialogRef.close();
  }

  save(){

    this.dialogRef.close(this.form.value);

  }
}
