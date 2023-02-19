import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) {
    super(spinner);
  }
  ngOnInit(): void {
    this.showSpinner();
    // this.httpClientService.get({
    //   controller: 'products'
    // }).subscribe(x => console.table(x));

    // this.httpClientService.post({
    //   controller: 'products'
    // }, {
    //   name: 'Test post 1',
    //   stock: 10001,
    //   price: 123,
    //   description: "Test description"
    // }).subscribe();

    // this.httpClientService.delete({
    //   controller: 'products'
    // }, 'e81fbb6d-7ddc-40d2-9894-e2bb5377e80d'	).subscribe();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.hideSpinner();
  }

}
