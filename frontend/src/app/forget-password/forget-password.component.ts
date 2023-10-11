import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import { UserService } from '../service/user.service';
import { SnackbarService } from '../service/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constant';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  forgotPasswordForm :any = FormGroup;
  responseMessage :any;

  constructor (private formBuilder:FormBuilder , private router:Router , private userService : UserService , private snackbarService:SnackbarService, private dialogRef:MatDialogRef<ForgetPasswordComponent>, private ngxService : NgxUiLoaderService) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email:[null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]]
    })  
  }

  handleSubmit(){
    this.ngxService.start()
    var formData = this.forgotPasswordForm.value
    var data = {
      email: formData.email
    }
    this.userService.forget(data).subscribe((response:any)=>{
      this.ngxService.stop()
      this.dialogRef.close()
      this.responseMessage = response?.message
      this.snackbarService.openSnackBar(this.responseMessage,"")
      this.router.navigate(["/"])
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
