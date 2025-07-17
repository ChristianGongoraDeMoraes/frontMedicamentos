import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpAccountService } from '../service/http-account.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  name: string = ""
  email: string = ""
  password: string = ""

  httpAccount = inject(HttpAccountService);
  router = inject(Router);

  register(){
    this.httpAccount.register({
      username: this.name,
      email: this.email,
      password: this.password}).subscribe({
        next: (data: any) => {
          this.router.navigate([""])
          //redirect
        },
        error: (error: any) =>{
          alert("error");
        }
    });
  }
}
