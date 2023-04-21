import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
// import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { AlertifyService, AlertType } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { CustomToastrService, ToastrAlertType } from 'src/app/services/ui/custom-toastr.service';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(private httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    private toastrService: CustomToastrService,
    private httpClient: HttpClient) {

  }

  @Input()
  options: Partial<FileUploadOptions>;

  files: File[] = [];

  onSelect(event) {
    this.files.push(...event.addedFiles);

    const formData = new FormData();

    for (var i = 0; i < this.files.length; i++) {
      formData.append("file[]", this.files[i]);
    }

    this.httpClientService.post({
      controller: this.options.controller,
      action: this.options.action,
      queryString: this.options.queryString,
      headers: new HttpHeaders({ "responseType": "blob" })
    }, formData).subscribe(data => {
      const message: string = "Dosya yükleme işlemi başarılı";
      if (this.options.isAdminPage) {
        this.alertifyService.alert(message, AlertType.Success);
      } else {
        this.toastrService.alert("İşlem Sonucu", message, ToastrAlertType.Success);
      }
    }, (errorResponse: HttpErrorResponse) => {
      const message: string = "Dosya yükleme işlemi başarısız";
      if (this.options.isAdminPage) {
        this.alertifyService.alert(message, AlertType.Error);
      } else {
        this.toastrService.alert("İşlem Sonucu", message, ToastrAlertType.Error);
      }
    });
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  private async readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = e => {
        return resolve((e.target as FileReader).result);
      };

      reader.onerror = e => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };

      if (!file) {
        console.error('No file to read.');
        return reject(null);
      }

      reader.readAsDataURL(file);
    });
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean;
}


