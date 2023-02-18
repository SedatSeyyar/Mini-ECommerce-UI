import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastrSevice: ToastrService) { }

  alert(title: string, message: string, alertType: ToastrAlertType) {
    this.toastrSevice[alertType](message, title, {
      positionClass: 'toast-bottom-right',
    });
  }
}

export enum ToastrAlertType {
  Error = "error",
  Success = "success",
  Warning = "warning",
  info = "info"
}