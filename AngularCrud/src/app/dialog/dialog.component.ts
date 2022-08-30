import { Component, Inject, OnInit } from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  employeeForm!: FormGroup;
  actionBtn : string ="Save";

  get employeeName() {
    return this.employeeForm.get('employeeName');  
  }

  get email() {
    return this.employeeForm.get('email');  
  }

  constructor(private fb: FormBuilder, 
    private _api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      employeeName : ['',Validators.required],
      email : ['',Validators.required],
      gender : ['',Validators.required],
      industry : ['',Validators.required],
      hireDate : ['',Validators.required],
      salary : ['',Validators.required]
    });

    if(this.editData){
      this.actionBtn = "Update";
      this.employeeForm.controls['employeeName'].setValue(this.editData.employeeName);
      this.employeeForm.controls['email'].setValue(this.editData.email);
      this.employeeForm.controls['gender'].setValue(this.editData.gender);
      this.employeeForm.controls['industry'].setValue(this.editData.industry);
      this.employeeForm.controls['hireDate'].setValue(this.editData.hireDate);
      this.employeeForm.controls['salary'].setValue(this.editData.salary);
    }
  }

    addEmployee(){
      if(!this.editData){
        //console.log(this.employeeForm.value);
        if(this.employeeForm.valid){
          this._api.postEmployee(this.employeeForm.value)
          .subscribe({
            next:(res)=> {
             alert("Employee details added successfully");
              this.employeeForm.reset();
              this.dialogRef.close('save');
            },
            error:()=>{
              alert("Error while adding the employee details")
            }
          })
        }     
      } else {
        this.updateEmployee(); 
      }
      
    }
    updateEmployee(){
      this._api.putEmployee(this.employeeForm.value, this.editData.id)
      .subscribe({
        next:(res)=>{
          alert("Employee details updated successfully");
          this.employeeForm.reset();
          this.dialogRef.close('update');
        },
        error:()=>{
          alert("Error while updating employee details!");
        }
      })
    }

}
