import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string = "http://localhost:8080/user/"
  constructor(private httpClient :HttpClient,private router:Router) { }
  signup(data:any){
    return this.httpClient.post(this.url+"signup",data,{
      headers: new HttpHeaders().set('Content-type','application/json')
    })
  }
  forget(data:any){
    return this.httpClient.post(this.url+"forgotPassword",data,{
      headers: new HttpHeaders().set('Content-type','application/json')
    })
  }
  login(data:any){
    return this.httpClient.post(this.url+"login",data,{
      headers: new HttpHeaders().set('Content-type','application/json')
    })
  }
  getUserFromLocalStorage(){
    const user = localStorage.getItem("token")
    if(user){
      return true
    }else{
      this.router.navigate(['/']);
      return false  
    }
  }
  changePassword(data:any){
    return this.httpClient.post(this.url+"changePassword",data,{
      headers : new HttpHeaders().set("Content-type","application/json")
    })
  }
  getUsers() {
    return this.httpClient.get(`${this.url}/get`);
  }

  update(data: any) {
    return this.httpClient.patch(`${this.url}/update`, data, {
      headers : new HttpHeaders().set("Content-type","application/json")
    });
  }
}
