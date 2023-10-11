import { Component, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/service/category.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constant';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  onAddCategory = new EventEmitter();
  onEditCategory = new EventEmitter()
  categoryForm:any = FormGroup
  dialogAction:any = "Add"
  action:any = "Add"
  responseMessage:any 
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any, private fb:FormBuilder, private categoryService:CategoryService, private dialogRef:MatDialogRef<CategoryComponent>,private snackbar: SnackbarService){}

  ngOnInit(){
    this.categoryForm = this.fb.group({
      name : [null,[Validators.required]]
    })
    if(this.dialogData.action === "Edit"){
      this.dialogAction = "Edit"
      this.action = "Update"
      this.categoryForm.patchValue(this.dialogData.data)
    }
  }
  handleSubmit(){
    if(this.dialogAction == "Edit"){
      this.edit()
    }else{
      this.add()
    }
  }
  edit(){
    let formData = this.categoryForm.value
    const data = {
      id: this.dialogData.data.id,
      name : formData.name
    }
    this.categoryService.update(data).subscribe((response:any)=>{
      this.dialogRef.close()
      this.onEditCategory.emit()
      this.responseMessage = response.message
      this.snackbar.openSnackBar(this.responseMessage,'success')
    },(error)=>{
      this.dialogRef.close()
      if(error.error?.message){
        this.responseMessage = error.error?.message
      }else{
        this.responseMessage = GlobalConstants.genericError
      }
      this.snackbar.openSnackBar(this.responseMessage,GlobalConstants.error)
    })
  }

  
  add(){
    let formData = this.categoryForm.value
    const data = {
      name : formData.name
    }
    this.categoryService.add(data).subscribe((response:any)=>{
      this.dialogRef.close()
      this.onAddCategory.emit()
      this.responseMessage = response.message
      this.snackbar.openSnackBar(this.responseMessage,'success')
    },(error)=>{
      this.dialogRef.close()
      if(error.error?.message){
        this.responseMessage = error.error?.message
      }else{
        this.responseMessage = GlobalConstants.genericError
      }
      this.snackbar.openSnackBar(this.responseMessage,GlobalConstants.error)
    })
  }

}
