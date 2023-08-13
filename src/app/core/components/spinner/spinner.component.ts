import { Component, OnDestroy } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { SpinnerHandlerService } from '../../services/spinner-handler/spinner-handler.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnDestroy {
  spinnerActive = true;
  spinnerMessages$!: Subscription;
  spinnerMessages: string[] = [];

  constructor(public spinnerHandler: SpinnerHandlerService, private spinner: NgxSpinnerService) {
    this.spinnerHandler.showSpinner.subscribe(this.showSpinner.bind(this));
    this.spinnerMessages$ = this.spinnerHandler.messageSpinner.subscribe(
      (messages: string[]) => (this.spinnerMessages = messages)
    );
  }

  showSpinner = (state: boolean): void => {
    this.spinnerActive = state;
  };

  ngOnDestroy() {
    this.spinnerMessages$.unsubscribe();
  }
}
