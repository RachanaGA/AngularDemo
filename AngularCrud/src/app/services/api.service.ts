import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  _url = "http://localhost:3000/employeeList/";

  constructor(private _http : HttpClient) { }

  postEmployee(userData : any){
    return this._http.post<any>(this._url, userData);
  }
  getEmployee(){
    return this._http.get<any>(this._url);
  }
  putEmployee(data : any, id : number){
    return this._http.put<any>(this._url + id, data);
  }
  deleteEmployee(id : number){
    return this._http.delete<any>(this._url+id);
  }
}
