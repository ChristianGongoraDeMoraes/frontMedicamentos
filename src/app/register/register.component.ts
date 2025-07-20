import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpAccountService } from '../service/http-account.service';
import { Router } from '@angular/router';
import { ToastService } from '../service/toast/toast.service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  name: string = ""
  email: string = ""
  password: string = ""

  isLoading = false;

  httpAccount = inject(HttpAccountService);
  router = inject(Router);

  toastService = inject(ToastService);
  showToast(message: string, type: boolean) {
    if(type == false) this.toastService.add(message, 3000, 'error');
    if(type == true) this.toastService.add(message, 3000, 'success');
  }


  register(){
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
