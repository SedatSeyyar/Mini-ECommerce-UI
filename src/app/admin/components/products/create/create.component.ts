import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { AlertifyService, AlertType } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent {

  constructor(spinner: NgxSpinnerService, private productService: ProductService, private alertify: AlertifyService) { super(spinner); }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement, description: HTMLTextAreaElement) {
    this.showSpinner();
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.price = price.value ? parseFloat(price.value) : 0;
    create_product.stock = stock.value ? parseInt(stock.value) : 0;
    create_product.description = description.value;
    this.productService.create(create_product, () => {
      this.hideSpinner();
      this.alertify.alert("Ürün başarıyla eklenmiştir.", AlertType.Success);
    },
      (message: string) => {
        this.hideSpinner();
        this.errorCallBack(message);
      });
  }

  errorCallBack(message: string) {
    this.alertify.alert(message, AlertType.Error);
  }
}
