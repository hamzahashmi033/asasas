import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  url:string = "http://localhost:8080/bill/";
  jsonHeader = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };
  constructor(private httpClient:HttpClient) { }

  generateReport(data:any){ 
    return this.httpClient.post(this.url+"generateReport",data,this.jsonHeader)
  }
  getPdf(data:any):Observable<Blob>{
    return this.httpClient.post(this.url+"getPDF",data,{
      responseType : 'blob'
    })
  }
  getBills(){
    return this.httpClient.get(this.url+"getBills")
  }
  delete(id: any) {
    return this.httpClient.delete(`${this.url}/delete/${id}`, this.jsonHeader);
  }
}
