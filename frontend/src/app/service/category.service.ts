import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url:string = "http://localhost:8080/category/"
  constructor(private httpClient:HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url+"add",data,{
      headers: new HttpHeaders().set('Content-type','application/json')
    })
  }
  update(data:any){
    return this.httpClient.patch(this.url+"update",data,{
      headers: new HttpHeaders().set('Content-type','application/json')
    })
  }
  get(){
    return this.httpClient.get(this.url+"get")
  }
}
