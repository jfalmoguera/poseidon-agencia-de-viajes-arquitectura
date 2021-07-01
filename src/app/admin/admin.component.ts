import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from '../shared/modals/confirmation.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private confirmationServices: ConfirmationService) { }

  ngOnInit(): void {
    this.confirmationServices.info({
      mensaje: 'Esta accediendo a im area restringida',
      ok: 'Continuar'
    });
  }

}
