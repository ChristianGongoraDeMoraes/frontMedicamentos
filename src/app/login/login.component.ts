import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpAccountService } from '../service/http-account.service';
import { Router } from '@angular/router';
import { ToastService } from '../service/toast/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  name: string = ""
  password: string = ""

  httpAccount = inject(HttpAccountService);
  router = inject(Router);

  toastService = inject(ToastService);
  showToast(message: string, type: boolean) {
    if(type == false) this.toastService.add(message, 3000, 'error');
    if(type == true) this.toastService.add(message, 3000, 'success');
  }

  login(){
    this.httpAccount.login({
      username: this.name,
      password: this.password}).subscribe({
        next: (data: any) => {
          localStorage.setItem('token', data.token);
          this.showToast("Logado com sucesso", true);

          this.router.navigate(['medicamentos']);

          //redirect
        },
        error: (error: any) =>{
          this.showToast("Erro ao Logar", false);
        }
    });
  }
}
