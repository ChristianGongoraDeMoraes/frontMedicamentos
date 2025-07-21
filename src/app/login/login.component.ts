import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpAccountService } from '../service/http-account.service';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../service/toast/toast.service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  name: string = ""
  password: string = ""

  isLoading = false;

  credenciaisInvalidas = false;

  httpAccount = inject(HttpAccountService);
  router = inject(Router);

  toastService = inject(ToastService);
  showToast(message: string, type: boolean) {
    if(type == false) this.toastService.add(message, 3000, 'error');
    if(type == true) this.toastService.add(message, 3000, 'success');
  }

  login(){
    this.isLoading = true;
    this.httpAccount.login({
      username: this.name,
      password: this.password})
      .pipe(
        finalize(() => this.isLoading = false))
      .subscribe({
        next: (data: any) => {
          localStorage.setItem('token', data.token);
          this.showToast("Logado com sucesso", true);

          this.router.navigate(['medicamentos']);

          //redirect
        },
        error: (error: any) =>{
          this.credenciaisInvalidas = true;
          this.showToast("Erro ao Logar", false);
        }
    });
  }
}
