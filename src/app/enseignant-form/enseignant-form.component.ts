import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Enseignant } from 'src/models/enseignant';
import { Member } from 'src/models/member';
import { MemberService } from 'src/services/member.service';
import { MyErrorStateMatcher } from '../app.module';

@Component({
  selector: 'app-enseignant-form',
  templateUrl: './enseignant-form.component.html',
  styleUrls: ['./enseignant-form.component.css']
})
export class EnseignantFormComponent {
  matcher = new MyErrorStateMatcher();
  form!: FormGroup;
  enseignantGlobal!: Member;
  idCourant1: number;
  constructor(private MS: MemberService, private router:Router, private activatedRoute: ActivatedRoute) { }

  initForm(): void{
    this.form = new FormGroup({
      cin: new FormControl(null, [Validators.required]),
      nom: new FormControl(null, [Validators.required]),
      prenom: new FormControl(null, [Validators.required]),
      dateNaissance: new FormControl(null, [Validators.required]),
      cv: new FormControl(null, [Validators.required]),
      grade : new FormControl(null, [Validators.required]),
      etablissement : new FormControl(null, [Validators.required]),

    })
  }

  initForm2(enseignant: Member): void {
    console.log('Initializing form with enseignant:', enseignant);

    this.form = new FormGroup({
      cin: new FormControl(enseignant.cin, [Validators.required]),
      nom: new FormControl(enseignant.nom, [Validators.required]),
      prenom: new FormControl(enseignant.prenom, [Validators.required]),
      dateNaissance: new FormControl(enseignant.dateNaissance, [Validators.required]),
      cv: new FormControl(enseignant.cv, [Validators.required]),
      grade: new FormControl(enseignant.grade, [Validators.required]),
      etablissement: new FormControl(enseignant.etablissement, [Validators.required]),
    });

    console.log('Form values after initialization:', this.form.value);
  }
  ngOnInit():void{
    this.idCourant1 = this.activatedRoute.snapshot.params['id']; // "1234"
    console.log(this.idCourant1);
    if (!!this.idCourant1) // if truly idCourant  // je suis dans edit
    {
      this.MS.getMemberById(this.idCourant1).subscribe((enseignant)=>{

          this.enseignantGlobal = enseignant;
          this.initForm2(enseignant);
      })

    }else{ // je suis dans create
      this.initForm();
    }
  }

  OnSubmit():void{
    // récupérer le contenu
    console.log(this.form.value);

    var enseignant = {...this.enseignantGlobal, ...this.form.value};

    if (!!this.idCourant1) // if truly idCourant  // je suis dans edit
    {
      enseignant = {id:this.idCourant1, ...enseignant};
      this.MS.updateMember("enseignant", enseignant).subscribe(()=> {this.router.navigate(['/members'])});
    }else{
      this.MS.saveMember("enseignant", enseignant).subscribe(()=> {this.router.navigate(['/members'])});
    }




    }
}
