import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpAccountService } from '../service/http-account.service';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../service/toast/toast.service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  name: string = ""
  email: string = ""
  password: string = ""
  password2:string = ""

  failRegister: string[] = [];

  isLoading = false;

  httpAccount = inject(HttpAccountService);
  router = inject(Router);

  toastService = inject(ToastService);
  showToast(message: string, type: boolean) {
    if(type == false) this.toastService.add(message, 3000, 'error');
    if(type == true) this.toastService.add(message, 3000, 'success');
  }


  register(){
    this.failRegister = [];
    if (this.password.length < 12) this.failRegister.push("Senha deve ter acima de 12 caracteres")
    if(!/[^\w\s]/.test(this.password)) this.failRegister.push("Senha deve conter ao menos um digito especial");
    if(!/[A-Z]/.test(this.password)) this.failRegister.push("Senha deve conter ao menos uma letra maiuscula");
    if(!/\d/.test(this.password)) this.failRegister.push("Senha deve conter ao menos um digito numerico");
    if(this.password != this.password2) this.failRegister.push("Senhas não coincidem");
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) this.failRegister.push("Email invalido")


    if(this.failRegister.length > 0) return

    this.isLoading = true;
    this.httpAccount.register({
      username: this.name,
      email: this.email,
      password: this.password})
      .pipe(finalize(()=>this.isLoading = false))
      .subscribe({
        next: (data: any) => {
          this.showToast("Registrado com sucesso", true);
          this.router.navigate([""])
          //redirect
        },
        error: (error: any) =>{
          this.showToast("Erro ao Registrar", false);
        }
    });
  }
}
