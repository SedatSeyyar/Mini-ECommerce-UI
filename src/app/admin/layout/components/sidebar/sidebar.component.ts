import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @ViewChild('dashboard') dashboardChild: ElementRef;
  @ViewChild('orders') ordersChild: ElementRef;
  @ViewChild('products') productsChild: ElementRef;
  @ViewChild('customers') customersChild: ElementRef;

  constructor(private router: Router) {
  }

  ngAfterViewInit(): void {
    const urlLastPart = this.router.url.split('/').at(-1);
    switch (urlLastPart) {
      case "orders":
        this.ordersChild.nativeElement.classList.add("active");
        break;
      case "products":
        this.productsChild.nativeElement.classList.add("active");
        break;
      case "customers":
        this.customersChild.nativeElement.classList.add("active");
        break;
      default:
        this.dashboardChild.nativeElement.classList.add("active");
    }
  }

  navClicked(event: any) {
    var activeElements = document.querySelectorAll('.active');
    activeElements.forEach(el => el.classList.remove('active'));
    const element: HTMLElement = event.srcElement;
    element.classList.add("active");
  }

}
