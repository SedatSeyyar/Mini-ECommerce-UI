import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { AlertifyService, AlertType } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent {

  constructor(spinner: NgxSpinnerService, private productService: ProductService, private alertifyService: AlertifyService) { super(spinner); }

  displayedColumns: string[] = ['Name', 'Description', 'Price', 'Stock', 'CreatedTime', 'UpdatedTime'];
  dataSource: MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit() {
    await this.getProducts();
  }

  async getProducts() {
    this.showSpinner();
    const allProducts: {totalCount: number, products : List_Product[]} = await this.productService.read( this.paginator?.pageIndex ?? 0,
      this.paginator ? this.paginator.pageSize : 5,
      () => {
        this.hideSpinner();
      },
      (message: string) => {
        this.hideSpinner();
        this.alertifyService.alert(message, AlertType.Error);
      });
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length = allProducts.totalCount;
  }

  async pageChanged(){
    await this.getProducts();
  }
}

