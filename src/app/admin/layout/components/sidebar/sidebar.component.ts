import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  navClicked(event: any) {
    var activeElements = document.querySelectorAll('.active');
    activeElements.forEach(el => el.classList.remove('active'));
    const element: HTMLElement = event.srcElement;
    element.classList.add("active");
  }

}
