import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  alert(message: string, messageType: AlertType = AlertType.Success) {
    alertify.set('notifier','position', 'bottom-center'); // Positon çeşitleri mevcut parametrik yapılabilir.
    alertify[messageType](message);
  }
}

export enum AlertType {
  Error = "error",
  Success = "success",
  Warning = "warning",
  Message = "message",
  Notify = "notify"
}