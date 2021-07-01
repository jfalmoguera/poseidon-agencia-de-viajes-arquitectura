import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { InfoModalComponent } from '../info-modal/info-modal.component';
import { ConfirmationData, ConfirmationModalComponent } from './confirmation-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  constructor(private dialog: MatDialog) { }

  confirmar(data: ConfirmationData): Observable<any> {

    return this.dialog.open(ConfirmationModalComponent, {
      data,
      width: '500px',
      disableClose: true
    }).afterClosed();
  }

  info(data: ConfirmationData): Observable<any> {
    return this.dialog.open(InfoModalComponent, {
      data,
      width: '500px',
      disableClose: true
    }).afterClosed();
  }

}
