import { Component, Input, OnInit } from '@angular/core';
import {
  HttpEventType,
  HttpHeaderResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Image } from '../../models/getImagesModel';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  images_all: Image[] = [];
  fileInfos?: Observable<Image[]>;

  constructor(private uploadService: FileUploadService) {}

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
    // wait for fileInfos to be populated
    this.fileInfos.subscribe((data: any) => {
      //convert image to base64
      data.forEach((image: any) => {
        // convert _arrayBufferToBase64
        const imageBase64 = _arrayBufferToBase64(image.img.data.data);
        console.log(imageBase64);
        image.img.data.data = imageBase64;
        // copy image to images array
        this.images_all.push(image as Image);
      });
    });
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(imageName: string, imageDescr: string): void {    
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        console.log(file);

        // push data to express endpoint
        this.uploadService.upload(file, imageName, imageDescr).subscribe({
          next: (event: any) => {
            // get upload progess
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round((100 * event.loaded) / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFiles();
            }
            if (event instanceof HttpHeaderResponse) {
              //check if upload was successfully
              if (event.status === 200) {
                this.message = 'upload successful';
              } else {
                this.message = 'Could not upload the file!';
              }
            }
          },
          
        });
      }

      this.selectedFiles = undefined;
    }
  }
}
function _arrayBufferToBase64(buffer: any) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}
