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

    this.loader.showLoading(request.url);

    return next.handle(request).pipe(
      delay(400),
      catchError((e) => {
        this.loader.hideLoading(request.url);
        return e;
      }),
      tap((evt: any) => {
        if (evt instanceof HttpResponse) {
          this.loader.hideLoading(request.url);
        }
      })
    );
  }
}
