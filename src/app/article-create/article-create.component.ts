import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Publication } from 'src/models/publication';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;

  constructor(
    private dialogRef: MatDialogRef<ArticleCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { publication?: Publication }
  ) {
    this.form = new FormGroup({
      titre: new FormControl('', [Validators.required]),
      lien: new FormControl('', [Validators.required]),
      date: new FormControl(null),
      sourcepdf: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    if (this.data?.publication) {
      this.isEditMode = true;
      this.form.patchValue({
        titre: this.data.publication.titre,
        lien: this.data.publication.lien,
        date: this.data.publication.date,
        sourcepdf: this.data.publication.sourcepdf
      });
    }
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}