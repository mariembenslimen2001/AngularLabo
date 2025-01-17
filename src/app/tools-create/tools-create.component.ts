import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolService } from 'src/services/tool.service';

@Component({
  selector: 'app-tools-create',
  templateUrl: './tools-create.component.html',
  styleUrls: ['./tools-create.component.css']
})
export class ToolsCreateComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  toolId?: number;

  constructor(
    private fb: FormBuilder,
    private toolService: ToolService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      date: ['', Validators.required],
      source: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.toolId = +params['id'];
        this.loadToolData();
      }
    });
  }

  loadToolData() {
    if (this.toolId) {
      this.toolService.getToolById(this.toolId).subscribe(tool => {
        this.form.patchValue({
          nom: tool.nom,
          date: tool.date,
          source: tool.source
        });
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const toolData = this.form.value;
      if (this.isEditMode && this.toolId) {
        this.toolService.updateTool({ ...toolData, id: this.toolId }).subscribe(() => {
          this.router.navigate(['/tools']);
        });
      } else {
        this.toolService.saveTool(toolData).subscribe(() => {
          this.router.navigate(['/tools']);
        });
      }
    }
  }
}