import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Create_Product } from 'src/app/contracts/create_product';
import { List_Product } from 'src/app/contracts/list_product';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: 'products'
    }, product).subscribe(() => {
      successCallBack();
    },
      (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
        let message = "";
        _error.forEach((v) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br>`;
          });
        });
        errorCallBack(message);
      }
    );
  }

  async read(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void)
    : Promise<{ totalCount: number, products: List_Product[] }> {
    const promiseData: Promise<{ totalCount: number, products: List_Product[] }> =
      this.httpClientService.get<{ totalCount: number, products: List_Product[] }>({
        controller: "products",
        queryString: `page=${page}&size=${size}`
      }).toPromise();

    promiseData
      .then(() => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message));

    return await promiseData;
  }

  async delete(id: string) {
    const deleteObservable = this.httpClientService.delete({
      controller: "products"
    }, id);
    await firstValueFrom(deleteObservable);
  }
}
