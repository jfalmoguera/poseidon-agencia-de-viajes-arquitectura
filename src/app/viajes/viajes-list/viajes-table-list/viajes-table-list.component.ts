import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Viaje } from '../../models/viaje';


@Component({
  selector: 'app-viajes-table-list',
  templateUrl: './viajes-table-list.component.html',
  styleUrls: ['./viajes-table-list.component.scss']
})
export class ViajesTableListComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  @Input() viajes: Viaje[] = [];
  @Output() editar = new EventEmitter<string>();
  @Output() borrar = new EventEmitter<string>();

  dataSource = new MatTableDataSource<Viaje>();
  displayedColumns: string[] = ['nombre', 'destino', 'duracion', 'plazas', 'precio', 'tipoDeViajeId', 'estado', 'fechaSalida', 'enOferta', 'actions'];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.viajes) {
      this.dataSource.data = [...changes.viajes.currentValue];
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

}
