import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CustomToastrService, ToastrAlertType } from './services/ui/custom-toastr.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  headerDisplay: string = "block";
  constructor(private toaster: CustomToastrService,
    router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.indexOf("admin") > 0)
          this.headerDisplay = "none";
        else 
          this.headerDisplay = "block";
      }
    })

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.toaster.alert("Test", "Deneme", ToastrAlertType.Warning);
  }

  title = 'ETicaretClient';
}
