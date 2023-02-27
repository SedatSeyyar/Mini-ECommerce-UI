import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeleteDialogComponent, DeleteState } from 'src/app/admin/components/dialogs/delete/delete-dialog/delete-dialog.component';
import { SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, AlertType } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    renderer: Renderer2,
    private httpClientService: HttpClientService,
    private spinnerService: NgxSpinnerService,
    public dialog: MatDialog,
    private alertifyService: AlertifyService) {
    const icon = renderer.createElement("i");
    icon.setAttribute("style", "cursor: pointer;");
    renderer.addClass(icon, 'bi');
    renderer.addClass(icon, 'bi-trash');
    renderer.addClass(icon, 'text-danger');
    renderer.appendChild(element.nativeElement, icon);
  }

  @Input() id: string;
  @Input() controller: string;
  @Output() refreshTable: EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  async onClick() {
    this.openDialog(async () => {
      this.spinnerService.show(SpinnerType.CrudSpinner);
      this.httpClientService.delete(
        {
          controller: this.controller
        },
        this.id).subscribe(data => {
          this.spinnerService.hide(SpinnerType.CrudSpinner);
          this.element.nativeElement.parentElement.parentElement.remove();
          this.refreshTable.emit();
          this.alertifyService.alert("The item has been successfully deleted.", AlertType.Success);
        }, (errorResponse: HttpErrorResponse) => {
          this.spinnerService.hide(SpinnerType.CrudSpinner);
          this.alertifyService.alert("The item has <b>not</b> been successfully deleted.", AlertType.Error);
        });
    });
  }

  openDialog(afterClosed: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: DeleteState.Yes
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.Yes) {
        afterClosed();
      }
    });
  }
}
