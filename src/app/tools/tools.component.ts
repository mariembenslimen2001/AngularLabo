import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToolService } from 'src/services/tool.service';
import { ToolsCreateComponent } from '../tools-create/tools-create.component';
import { Router } from '@angular/router';
import { Tool } from 'src/models/tool';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MemberService } from 'src/services/member.service';
import { Observable } from 'rxjs';
import { Member } from 'src/models/member';
import { AffecterMemberComponent } from '../affecter-member/affecter-member.component';
import { ConsulterMemberComponent } from '../consulter-member/consulter-member.component';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css'],
})
export class ToolsComponent implements AfterViewInit,OnInit, OnDestroy  {
  tools: Tool[] = [];
  obs: Observable<any>;
  dataSource: MatTableDataSource<Tool>;
  // displayedColumns: string[] = [ "id",
  // "nom",
  // "date",
  // "source",
  // "createur"];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  loadTools() : void{
    this.TS.getTools().subscribe(tools => {
      tools.forEach(tool => {
        if (tool.createur != undefined){
          this.MS.getMemberById(tool.createur.id).subscribe(member => {
            tool.createur = member;
          })
        }

      })
      this.dataSource = new MatTableDataSource(tools)
      this.obs = this.dataSource.connect();

      // Move paginator initialization inside the subscription block
      if (this.dataSource) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
  constructor(
    private TS: ToolService,
    private MS: MemberService,
    private dialog: MatDialog,
    private router: Router,
  ) {
      this.loadTools();
  }

  openToolCreate(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(ToolsCreateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) =>
    {
      const tool = { ...data };

      this.TS.saveTool(tool).subscribe((tool) => {
        // Update the data source after saving the tool
        this.loadTools();
        // or manually add the tool to the existing list
        // this.dataSource.push(toolNew);

        // Close the dialog
      });
    });


  }
  editTool(id: number): void {
    this.router.navigate([`/tools/${id}/edit`]);
  }

  deleteTool(id: number): void {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cet outil ?');
    if (confirmed) {
      this.TS.deleteTool(id).subscribe(() => {
        this.loadTools(); // Rechargez la liste des outils après suppression
      });
    }
  }
  affecter(toolId: number): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(AffecterMemberComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) =>
    {
      console.log(data);
      this.MS.affectMemberToTool(data.member.id, toolId).subscribe(()=>{
        // or manually add the tool to the existing list
        // this.dataSource.push(toolNew);
        // this.router.navigate(['/dashboard']);
        // Close the dialog
        location.reload();

      });
    });

  }
  

  consulter(toolId: number): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { toolId };
    const dialogRef = this.dialog.open(ConsulterMemberComponent, dialogConfig);
  }

  ngOnInit() {
    this.loadTools();
  }
  ngAfterViewInit() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }
}
