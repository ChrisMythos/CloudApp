import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Image } from '../../models/getImagesModel';

@Component({
  selector: 'app-file-search',
  templateUrl: './file-search.component.html',
  styleUrls: ['./file-search.component.css'],
})
export class FileSearchComponent implements OnInit {
  searchText = new FormControl('');
  images_all: Image[] = [];
  fileInfos?: Observable<Image[]>;

  constructor(private uploadService: FileUploadService) {}

  ngOnInit(): void {}

  search() {
    // search Files with searchText
    console.log(this.searchText.value);
    if (this.searchText.value) {
      this.fileInfos = this.uploadService.searchFiles(this.searchText.value);
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
