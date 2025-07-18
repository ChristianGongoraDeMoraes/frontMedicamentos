import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpAccountService } from '../service/http-account.service';
import { Router } from '@angular/router';

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
  router = inject(Router);

  login(){
    this.httpAccount.login({
      username: this.name,
      password: this.password}).subscribe({
        next: (data: any) => {
          localStorage.setItem('token', data.token);
          

          this.router.navigate(['medicamentos']);

          //redirect
        },
        error: (error: any) =>{
          alert("error");
        }
    });
  }
}
