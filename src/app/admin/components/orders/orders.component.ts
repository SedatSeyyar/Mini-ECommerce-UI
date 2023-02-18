import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent extends BaseComponent {

  constructor(spinner: NgxSpinnerService) {
    super(spinner);
    this.spinnerType = SpinnerType.CorsSpinner;
  }

  ngOnInit() {
    /** spinner starts on init */
    this.showSpinner();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.hideSpinner();
  }
}
