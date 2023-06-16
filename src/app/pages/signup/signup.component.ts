import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  constructor(private userService:UserService,private snack:MatSnackBar){}

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
  };
  ngOnInit(): void {}
  formSubmit(){
    console.log(this.user);
    if(this.user.username=='' || this.user.username==null)
    {
      this.snack.open('Username is required','OK');
      return;
    }

    if(this.user.password=='' || this.user.password==null)
    {
      this.snack.open('Password is required','OK');
      return;
    }

    if(this.user.firstName=='' || this.user.firstName==null)
    {
      this.snack.open('Firstname is required','OK');
      return;
    }

    // if(this.user.lastName=='' || this.user.lastName==null)
    // {
    //   this.snack.open('lastname is required','OK');
    //   return;
    // }

    if(this.user.email=='' || this.user.email==null)
    {
      this.snack.open('E-mail is required','OK');
      return;
    }

    this.userService.addUser(this.user).subscribe(
      (data:any)=>{
        console.log(data);
        Swal.fire('Success','User is registered with ID '+data.id,'success');
      },
      (error)=>{
        console.log(error);
        this.snack.open('Something went wrong','',{
          duration:3000
        });
      }
    )
  }
}
