import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IdValor } from 'src/app/models/id-valor';
import { ViajesFilter } from '../../models/viajes-filter';
@Component({
  selector: 'app-viajes-filter',
  templateUrl: './viajes-filter.component.html',
  styleUrls: ['./viajes-filter.component.scss']
})
export class ViajesFilterComponent implements OnInit {

  @Input() tiposDeViaje: IdValor[] = [];
  @Output() search = new EventEmitter<ViajesFilter>();

  filterForm: FormGroup;

  constructor(fb: FormBuilder) {

    this.filterForm = fb.group({
      nombre: [''],
      tipoDeViajeId: [''],
      destino: [''],
    })

  }

  ngOnInit(): void {
  }

  searchClick(form: FormGroup) {
    this.search.emit(new ViajesFilter(form.value));
  }

  reset(): void{
    this.filterForm.reset();
    this.search.emit(new ViajesFilter());
  }
}
