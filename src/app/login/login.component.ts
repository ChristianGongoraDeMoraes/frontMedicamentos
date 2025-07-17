import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpAccountService } from '../service/http-account.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  name: string = ""
  password: string = ""

  httpAccount = inject(HttpAccountService);

  login(){
    this.httpAccount.login({
      username: this.name,
      password: this.password}).subscribe({
        next: (data: any) => {
          localStorage.setItem('token', data.token);
          alert(data.token)

          //redirect
        },
        error: (error: any) =>{
          alert("error");
        }
    });
  }
}
