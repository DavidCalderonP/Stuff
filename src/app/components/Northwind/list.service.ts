import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
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
}
