import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url:string = "http://localhost:8080/product/"
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
  updateStatus(data:any){
    return this.httpClient.patch(this.url+"updateStatus",data,{
      headers: new HttpHeaders().set('Content-type','application/json')
    })
  }
  delete(id:any){
    return this.httpClient.delete(this.url+`delete/${id}`,{
      headers: new HttpHeaders().set('Content-type','application/json')
    })
  }
  getProductsByCategoryId(id:any){
    return this.httpClient.get(this.url+`getByCategoryID/${id}`)
  }
  getProductsById(id:any){
    return this.httpClient.get(this.url+`getByID/${id}`)
  }
}
