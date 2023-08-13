import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class SpinnerHandlerService {

  public numberOfRequests = 0;
  public showSpinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public messageSpinner: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  handleRequest = (state = 'minus', message = ''): void => {
    this.numberOfRequests = state === 'plus' ? this.numberOfRequests + 1 : this.numberOfRequests - 1;
    this.showSpinner.next(this.numberOfRequests > 0);

    const messageSpinnerCopy: string[] = this.messageSpinner.getValue();
    if (state === 'minus') {
      messageSpinnerCopy.forEach((item, index) => {
        if (item === message) {
          messageSpinnerCopy.splice(index, 1);
        }
      });
    } else {
      if (messageSpinnerCopy.indexOf(message) === -1) {
        messageSpinnerCopy.push(message);
      }
    }
    this.messageSpinner.next(messageSpinnerCopy);
  };
}
