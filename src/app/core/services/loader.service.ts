import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private $loading = new BehaviorSubject(false);

  constructor() { }

  showLoading(): void {
    this.$loading.next(true);
  }

  hideLoading(): void {
    this.$loading.next(false);
  }

  get loading():Observable<boolean>{
    return this.$loading.asObservable();
  }

}
