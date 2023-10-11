import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UserService } from 'src/app/service/user.service';
import { GlobalConstants } from 'src/app/shared/global-constant';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  changePasswordForm: any = FormGroup
  responseMessage: any;
  constructor(private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private ngxUiLoader: NgxUiLoaderService,
    private snackBar: SnackbarService
  ) { }
  ngOnInit(): void {
    this.changePasswordForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }
  validateSubmit() {
    if (
      this.changePasswordForm.controls.newPassword.value !==
      this.changePasswordForm.controls.confirmPassword.value
    ) {
      return true;
    } else {
      return false;
    }
  }
  handleSubmit(){
    this.ngxUiLoader.start();
    let formData = this.changePasswordForm.value;
    let data = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    };

    this.userService.changePassword(data).subscribe(
      (resp: any) => {
        this.ngxUiLoader.stop();
        this.responseMessage = resp?.message;
        this.dialogRef.close();
        this.snackBar.openSnackBar(this.responseMessage, 'success');
      },
      (error) => {
        this.ngxUiLoader.stop();
        console.log(error);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackBar.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }
}
