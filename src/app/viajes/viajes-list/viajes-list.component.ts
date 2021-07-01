import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdValor } from 'src/app/models/id-valor';
import { ConfirmationService } from 'src/app/shared/confirmation-modal/confirmation.service';
import { GridEvent } from '../models/grid-event';
import { ViajesFilter } from '../models/viajes-filter';
import { ViajesGridResult } from '../models/viajes-grid-result';
import { ViajesModelService } from '../services/viajes-model.service';

@Component({
  selector: 'app-viajes-list',
  templateUrl: './viajes-list.component.html',
  styleUrls: ['./viajes-list.component.scss']
})
export class ViajesListComponent implements OnInit {

  tiposDeViaje: IdValor[] = [];
  viajes: ViajesGridResult = new ViajesGridResult();

  mostrarTarjetas = false;

  filtro: ViajesFilter | null = null;

  constructor(private viajesModel: ViajesModelService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit(): void {
    this.viajesModel.getViajes().subscribe(result => {
      this.viajes = result;
    });
    this.tiposDeViaje = this.viajesModel.getTiposDeViajes();
  }

  cambiarVistaClick() {
    this.mostrarTarjetas = !this.mostrarTarjetas;
  }

  searchClick(filtro: ViajesFilter): void {
    if (filtro) {
      this.filtro = filtro;
      this.viajesModel.buscar(filtro).subscribe(result => {
        this.viajes = result;
      });
    }
  }

  borrarClick(id: string): void {
    if (id) {
      this.confirmationService.confirmar(
        {
          titulo: 'Eliminar Viaje',
          pregunta: '¿ Seguro que quiere eliminar el viaje ?',
          opcionSi: 'Si, eliminar',
          opcionNo: 'No, cancelar'
        }
      ).subscribe(x => {
        if (x) {
          this.viajesModel.eliminar(id).subscribe(result => {
            this.viajesModel.getViajes().subscribe(result => {
              this.viajes = result;
            });
          })
        }
      })
    }
  }

  editarClick(id: string): void {
    if (id) {
      this.router.navigate(['viajes/editar', id]);
    }
  }

  paging(ev: GridEvent): void {
    this.viajesModel.buscar(this.filtro, ev).subscribe(result => {
      if (result) {
        this.viajes = result;
      }
    });
  }
}
