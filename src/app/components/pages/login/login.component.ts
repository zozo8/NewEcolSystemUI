import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginObj:Login = {};
  constructor(
    private authService:AuthService
  ) { }

  login(){
    this.authService.loginToUR(this.loginObj).subscribe({
      next:(res:any)=>console.log("res",res),
      complete:()=>console.log("pobrało")
    });
  }


}
