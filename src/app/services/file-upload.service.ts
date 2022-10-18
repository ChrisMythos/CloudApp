import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Image } from '../models/getImagesModel';
@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  
  private baseUrl: string = "http://"+window.location.host+":3000";

  constructor(private http: HttpClient) {}

  upload(
    file: File,
    imageName: string,
    imageDescr: string
  ): Observable<HttpEvent<any>> {
    // Add all data to the Object
    const imgData: Object = {
      name: imageName,
      desc: imageDescr,
      img: file,
    };

    const imgFormData: FormData = new FormData();
    imgFormData.append('name', imageName);
    imgFormData.append('desc', imageDescr);
    imgFormData.append('img', file);

    console.log('Trying to save... ');

    // post data to NodeJs endpoint
    const req = new HttpRequest(
      'POST',
      `${this.baseUrl}/uploadImage`,
      imgFormData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );

    return this.http.request(req);
  }

  // get all pictures from NodeJs endpoint
  getFiles(): Observable<Image[]> {
    //map response to Image[]
    return this.http.get<Image[]>(`${this.baseUrl}/getImages`);
  }

  searchFiles(searchText: string): Observable<Image[]> {
    //map response to Image[]
    return this.http.get<Image[]>(
      `${this.baseUrl}/queryImage?queryString=${searchText}`
    );
  }
}
