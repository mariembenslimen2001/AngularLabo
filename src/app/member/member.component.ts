import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GLOBAL } from '../app-config';
import { Member } from 'src/models/member';
import { MemberService } from 'src/services/member.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Enseignant } from 'src/models/enseignant';
import { Etudiant } from 'src/models/etudiant';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AffecterEnseignantComponent } from '../affecter-enseignant/affecter-enseignant.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements AfterViewInit, OnInit{
  enseignantSource: MatTableDataSource<Enseignant>; // db.tab.enseignants
  etudiantSource: MatTableDataSource<Etudiant>;

  enseignantColumns: string[] = [ 'cin', 'nom','prenom','dateNaissance','cv', 'grade', 'etablissement', 'actions'];
  etudiantColumns: string[] = [ 'cin', 'nom','prenom','dateNaissance','cv','encadrant','dateInscription','diplome','sujet', 'actions'];

  @ViewChild('enseignantPaginator') enseignantPaginator: MatPaginator;
  @ViewChild('etudiantPaginator') etudiantPaginator: MatPaginator;

  loadMembers() : void{
    // Enseignants
    this.MS.getEnseignants().subscribe(members => {
      this.enseignantSource = new MatTableDataSource(members);

      if (this.enseignantSource){
        console.log(this.enseignantSource.data);
        this.enseignantSource.paginator = this.enseignantPaginator; // Assign the paginator
      }

    });

    // Etudiants
    this.MS.getEtudiants().subscribe(members => {
      this.etudiantSource = new MatTableDataSource(members);
      if (this.etudiantSource){
        console.log(this.etudiantSource.data);
        this.etudiantSource.paginator = this.etudiantPaginator; // Assign the paginator
      }

    });
  }

  constructor (private MS: MemberService,private dialog: MatDialog,  private router: Router){

  }

  ngOnInit(){
    this.loadMembers();
  }
  ngAfterViewInit() {

  }

  applyFilterOnEnseignants(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.enseignantSource.filter = filterValue.trim().toLowerCase();

    if (this.enseignantSource.paginator) {
      this.enseignantSource.paginator.firstPage();
    }
  }

  applyFilterOnEtudiants(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.etudiantSource.filter = filterValue.trim().toLowerCase();

    if (this.etudiantSource.paginator) {
      this.etudiantSource.paginator.firstPage();
    }
  }

  affecter(etudiant: Member): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AffecterEnseignantComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) =>
    {
      console.log(data);
      this.MS.affectEtudiantToEnseignant(etudiant, data.encadrant).subscribe(()=>{
        // or manually add the tool to the existing list
        // this.dataSource.push(toolNew);
        // this.router.navigate(['/dashboard']);
        // Close the dialog
        location.reload();

      });
    });


  }

  deleteEnseignant(id: number): void {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cet enseignant ?');
    if (confirmed) {
      this.MS.deleteEnseignant(id).subscribe(() => {
        this.loadMembers(); // Rechargez la liste des enseignants après suppression
      });
    }
  }
  
  deleteEtudiant(id: number): void {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?');
    if (confirmed) {
      this.MS.deleteEtudiant(id).subscribe(() => {
        this.loadMembers(); // Rechargez la liste des étudiants après suppression
      });
    }
  }
}
