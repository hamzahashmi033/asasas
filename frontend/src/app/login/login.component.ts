import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import { UserService } from '../service/user.service';
import { SnackbarService } from '../service/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm :any = FormGroup;
  responseMessage :any;

  constructor (private formBuilder:FormBuilder , private router:Router , private userService : UserService , private snackbarService:SnackbarService, private dialogRef:MatDialogRef<LoginComponent>, private ngxService : NgxUiLoaderService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      password:[null,[Validators.required]]
    })  
  }
  handleSubmit(){
    this.ngxService.start()
    var formData = this.loginForm.value
    var data = {
      email: formData.email,
      password : formData.password
    }
    this.userService.login(data).subscribe((response:any)=>{
      this.ngxService.stop()
      this.dialogRef.close()
      this.responseMessage = response?.message
      localStorage.setItem("token",response.token)
      this.snackbarService.openSnackBar(this.responseMessage,"")
      this.router.navigate(["/cafe/dashboard"])
    },(error)=>{
      this.ngxService.stop()
      if(error.error?.message){
        this.responseMessage = error.error?.message
      }else{
        this.responseMessage = GlobalConstants.genericError
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error)
    }
    )
  }
}
