import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';
import { catchError, delay, tap } from 'rxjs/operators';

@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {

  constructor(private loader: LoaderService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.loader.showLoading();

    return next.handle(request).pipe(
      delay(2000),
      catchError((e) => {
        this.loader.hideLoading();
        return e;
      }),
      tap((evt: any) => {
        if (evt instanceof HttpResponse) {
          this.loader.hideLoading();
        }
      })
    );
  }
}
