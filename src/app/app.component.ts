import { Component } from '@angular/core';
import { CustomToastrService, ToastrAlertType } from './services/ui/custom-toastr.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private toaster: CustomToastrService) {
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.toaster.alert("Test", "Deneme", ToastrAlertType.Warning);
  }
  title = 'ETicaretClient';
}
