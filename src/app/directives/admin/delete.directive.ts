import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { ProductService } from 'src/app/services/common/models/product.service';

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    renderer: Renderer2,
    private productService: ProductService,
    private spinnerService: NgxSpinnerService) {
    const icon = renderer.createElement("i");
    renderer.addClass(icon, 'bi');
    renderer.addClass(icon, 'bi-trash');
    renderer.addClass(icon, 'text-danger');
    renderer.appendChild(element.nativeElement, icon);
  }

  @Input() id: string;
  @Output() refreshTable: EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  async onClick() {
    this.spinnerService.show(SpinnerType.CrudSpinner);
    await this.productService.delete(this.id);
    this.spinnerService.hide(SpinnerType.CrudSpinner);
    this.element.nativeElement.parentElement.parentElement.remove();
    this.refreshTable.emit();
  }
}
