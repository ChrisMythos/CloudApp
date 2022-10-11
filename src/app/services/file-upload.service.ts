import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  upload(imgData: FormData): Observable<HttpEvent<any>> {
  

    const req = new HttpRequest('POST', `${this.baseUrl}/uploadImage`, imgData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getImages`);
  }
}
