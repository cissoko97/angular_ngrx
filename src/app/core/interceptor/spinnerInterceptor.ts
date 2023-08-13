import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { API_MESSAGE } from '../components/spinner/api-message-token';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerHandlerService } from '../services/spinner-handler/spinner-handler.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(public spinnerHandler: SpinnerHandlerService, private spinner: NgxSpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinner.show(undefined);

    const message: string = request.context.get(API_MESSAGE);
    this.spinnerHandler.handleRequest('plus', message);

    return next.handle(request).pipe(
      finalize(() => {
        this.spinnerHandler.handleRequest('minus', message);
        if (this.spinnerHandler.numberOfRequests === 0) this.spinner.hide();
      })
    );
  }
}
