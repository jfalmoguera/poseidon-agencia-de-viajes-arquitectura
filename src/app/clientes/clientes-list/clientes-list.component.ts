import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ClienteListItem } from '../models/cliente-list-item';
import { ClientesModelService } from '../services/clientes-model.service';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss']
})
export class ClientesListComponent implements OnInit {

  dataSource = new MatTableDataSource<ClienteListItem>([]);
  displayedColumns: string[] = ['pos', 'nombre', 'dni', 'telefono', 'estadoCivilDesc', 'actions'];

  constructor(private clientesModel: ClientesModelService, private router: Router) { }

  ngOnInit(): void {
    this.clientesModel.getAll().subscribe(clientes => {
      this.dataSource.data = clientes.map((x, idx) => ({ ...x, pos: idx + 1, }));
    })
  }

  borrarClick(id: string): void {

  }

  editarClick(id: string): void {
    if (id) {
      this.router.navigate(['clientes/editar', id])
    }
  }

}
