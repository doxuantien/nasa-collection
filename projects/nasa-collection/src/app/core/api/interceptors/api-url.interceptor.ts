import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROOT } from '../constants';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {
  public intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    let apiReq = request;

    if (request.url.startsWith('/') && !request.url.startsWith('/assets')) {
      apiReq = request.clone({
        url: `${ROOT}${request.url}`
      });
    }

    return handler.handle(apiReq);
  }
}
