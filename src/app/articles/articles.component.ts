import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Publication } from 'src/models/publication';
import { PublicationService } from 'src/services/publication.service';
import { ConsulterInvitesComponent } from '../consulter-invites/consulter-invites.component';
import { AffecterMemberComponent } from '../affecter-member/affecter-member.component';
import { MemberService } from 'src/services/member.service';
import { Router } from '@angular/router';
import { ArticleCreateComponent } from '../article-create/article-create.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit, OnDestroy, AfterViewInit{
  displayedColumns: string[] = ["id", "titre", "date", "lien", "sourcepdf"];
  dataSource: MatTableDataSource<Publication>;
  obs: Observable<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  ES: any;
$pub: Publication;

  constructor(private PS: PublicationService,private MS: MemberService,
    private dialog: MatDialog,
    private router:Router,private changeDetectorRef: ChangeDetectorRef) {}

  loadPublications(): void {
    this.PS.getPublications().subscribe(publications => {
      this.dataSource = new MatTableDataSource(publications);
      this.obs = this.dataSource.connect();

      // Initialisation du paginator à l'intérieur du bloc de souscription
      if (this.dataSource) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  ngOnInit() {
    this.loadPublications();
  }

  ngAfterViewInit() {
    // Aucune logique supplémentaire n'est nécessaire pour ngAfterViewInit pour le moment
  }
  applyFilter(event: Event) {
     const filterValue = (event.target as HTMLInputElement).value;
     this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  consulter(ArticleId: number): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { ArticleId };
    const dialogRef = this.dialog.open(ConsulterInvitesComponent, dialogConfig);
  }
 
  affecter(ArticleId: number): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AffecterMemberComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data: { member: { id: number; }; }) =>
    {
      console.log(data);
      this.MS.affectMemberToEvent(data.member.id, ArticleId).subscribe(()=>{
        // or manually add the tool to the existing list
        // this.dataSource.push(toolNew);
        // Close the dialog
        location.reload();
        // Close the dialog

      });
    });

    



  }
  editArticle(id: number): void {
    this.PS.getPublicationById(id).subscribe(publication => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = { publication };
  
      const dialogRef = this.dialog.open(ArticleCreateComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const updatedPublication: Publication = {
            ...result,
            id: id
          };
          this.PS.updatePublication(updatedPublication).subscribe(() => {
            this.loadPublications();
          });
        }
      });
    });
  }
  delete(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      this.PS.deletePublication(id).subscribe(() => {
        this.loadPublications();
      });
    }
  }

  openArticleCreate(): void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(ArticleCreateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        const article = { ...data };
    
        this.PS.savePublication(article).subscribe(
          (savedArticle) => {
            // Update the data source after saving the article
            this.loadPublications();
          },
          (error) => {
            console.error('Error saving publication:', error);
          }
        );
      }
    });
  }

  // Ajoutez d'autres méthodes ou fonctions selon vos besoins
  // Par exemple, des méthodes pour créer, mettre à jour, supprimer des publications, etc.

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
}
