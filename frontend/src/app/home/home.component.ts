import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog"
import { SignupComponent } from '../signup/signup.component';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private dialog:MatDialog, private userService:UserService,private router: Router){}
  ngOnInit(): void {
    if(this.userService.getUserFromLocalStorage()){
      this.router.navigate(['/cafe/dashboard'])
    }
  }
 
  signupAction(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = "550px"
    this.dialog.open(SignupComponent,dialogConfig)
  }
  forgetAction(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = "550px"
    this.dialog.open(ForgetPasswordComponent,dialogConfig)
  }
  loginAction(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = "550px"
    this.dialog.open(LoginComponent,dialogConfig)
  }
}
