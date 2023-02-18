import { Component } from '@angular/core';
import { AlertifyService, AlertType } from 'src/app/services/admin/alertify.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  constructor(private alertify: AlertifyService) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.alertify.alert("Selam");
  }
}