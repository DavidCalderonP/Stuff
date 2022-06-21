import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpContext, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "./list/list.component";

@Injectable({
    providedIn: 'root'
})
export class ListService {

    private baseUrl: string = environment.API;

    constructor(private http: HttpClient) {
    }

    getAllEmployees(perPage: string, page: string): Observable<any>{
        const params = new HttpParams()
            .set('perPage', perPage ? perPage : '4')
            .set('page', page ? page : '')

        const options = {params: params};
        return this.http.get(`${this.baseUrl}employees`, options);
    }

    fileUpload(images: any): Observable<any> {
      console.log("llamando el post")
      let data = { images: images}
      console.log("data: ", data)
      let obj = {
        name: 'David',
        lastname: 'calderon',
        brithdate: new Date()
      }

      const options = new HttpParams()
        .set('Authorization', '');
      return this.http.post(`${this.baseUrl}employees`,  data);
    }

    getFile(path: string): Observable<any>{
      return this.http.get(path);
    }

  async createFile(){
    let res = [];
    for (let i = 1 ; i <= 12 ; i++){
      let response = await fetch(`assets/image${i}.png`);
      let data = await response.blob();
      let metadata = {
        type: 'image/png'
      };
      let file = new File([data], `image${i}.png`, metadata);
      console.log(file)
      res.push(file);
    }
    return res;
  }

}
