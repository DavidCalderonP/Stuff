import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  baseUrl = environment.API;
  constructor(private http: HttpClient) {}

  public sendXml(data: any){
    return this.http.post(this.baseUrl + 'convertToPdf', data);
  }

  public sendFotos(data: any){
    return this.http.post(this.baseUrl + 'emp/employees', data);
  }

  public downloadFile(){
    return this.http.get("https://localhost:7182/api/books/zip", { responseType: 'arraybuffer'});
  }

  blobToFile(data: any, type: string, fileName: string) {
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    const blob = new Blob([data], { type: type });
    const url = window.URL.createObjectURL(blob);
    a.href = url; a.download = fileName; a.click();
    window.URL.revokeObjectURL(url);}
}
