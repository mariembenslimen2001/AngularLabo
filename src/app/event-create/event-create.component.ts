import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Evenement } from 'src/models/event';
import { EvenementService } from 'src/services/event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  isEditMode = false;
  eventId: number;

  range = new FormGroup({
    titre: new FormControl('', [Validators.required]),
    dateDebut: new FormControl('', [Validators.required]),
    dateFin: new FormControl(''),
    lieu: new FormControl('', [Validators.required])
  });

  constructor(
    private ES: EvenementService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.eventId = +id;
      this.ES.getEvenementById(this.eventId).subscribe(event => {
        if (event) {
          const startDate = new Date(event.dateDebut).toISOString().split('T')[0];
          const endDate = new Date(event.dateFin).toISOString().split('T')[0];
          
          this.range.patchValue({
            titre: event.titre,
            dateDebut: startDate,
            dateFin: endDate,
            lieu: event.lieu
          });
        }
      });
    }
  }

  OnSubmit(): void {
    if (this.range.valid) {
      const formValue = this.range.value;
      
      const eventData: Evenement = {
        id: this.isEditMode ? this.eventId : 0,
        titre: formValue.titre || '',
        dateDebut: formValue.dateDebut ? new Date(formValue.dateDebut).toISOString() : new Date().toISOString(),
        dateFin: formValue.dateFin ? new Date(formValue.dateFin).toISOString() : new Date().toISOString(),
        lieu: formValue.lieu || ''
      };

      if (this.isEditMode) {
        this.ES.updateEvenement(eventData).subscribe(() => {
          this.router.navigate(['/events']);
        });
      } else {
        this.ES.saveEvenement(eventData).subscribe(() => {
          this.router.navigate(['/events']);
        });
      }
    }
  }

  close(): void {
    this.router.navigate(['/events']);
  }
}