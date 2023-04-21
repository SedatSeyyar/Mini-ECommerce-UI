import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { NgxDropzoneModule } from 'ngx-dropzone';




@NgModule({
  declarations: [
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    NgxDropzoneModule
  ],
  exports:[
    FileUploadComponent
  ]
})
export class FileUploadModule { }

