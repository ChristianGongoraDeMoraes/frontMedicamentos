import { Component, inject, OnInit } from '@angular/core';
import { HttpMedicamentoService } from '../service/http-medicamento.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { HttpHorariosService } from '../service/http-horarios.service';
import { ToastService } from '../service/toast/toast.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

type Medicamento = {
  nome: string,
  dosagem: string,
  instrucoes: string
}

type Horario = {
  hora: string,
  medicamento: Medicamento
}

@Component({
  selector: 'app-medicamentos',
  imports: [FormsModule, CommonModule, MatIcon],
  templateUrl: './medicamentos.component.html',
  styleUrl: './medicamentos.component.scss'
})
export class MedicamentosComponent implements OnInit{
  httpMedicamento = inject(HttpMedicamentoService);
  httpHorarios = inject(HttpHorariosService);
  router = inject(Router);
  
  medAtual = "";

  horarios: Horario[] = []
  medicamentos: Medicamento[] = []

  showBoxAddMed = false;
  showHorarios = false;
  showDeleteMed = false;
  showDeleteHorario = false;

  addNewnome: string = "";
  addNewdosagem: string = "";
  addNewinstrucoes: string = "";

  isLoading = false;

  toastService = inject(ToastService);
  showToast(message: string, type: boolean) {
    if(type == false) this.toastService.add(message, 3000, 'error');
    if(type == true) this.toastService.add(message, 3000, 'success');
  }


  ngOnInit(): void {
    this.getMedicamentos();
  }

  logout(){
    localStorage.setItem("token", "")
    this.router.navigate([""]);
  }

  getMedicamentos(){
    this.medicamentos = [];
    this.isLoading = true;
    this.httpMedicamento.getMedicamento()
    .pipe(finalize(()=>this.isLoading = false))
    .subscribe({
        next: (data: any) => {    
          for(let med of data){
            this.medicamentos.push(med)
          }
          
        },
        error: (error: any) =>{
          this.showToast("Error ao Buscar Remedios", false);
        }
    });
  }

  swapRemedioBox(){
    this.showBoxAddMed = !this.showBoxAddMed;
  }
  swapHorariosBox(){
    this.showHorarios = !this.showHorarios;
  }
  swapDeleteMed(){
    this.showDeleteMed = !this.showDeleteMed;
  }
  swapDeleteHorario(){
    this.showDeleteHorario = !this.showDeleteHorario;
  }

  saveNewRemedio(){
    if(!this.addNewnome) return;
    if(!this.addNewdosagem) return;
    if(!this.addNewinstrucoes ) return;

    this.isLoading = true;
    this.httpMedicamento.saveMedicamento({nome: this.addNewnome, dosagem: this.addNewdosagem, instrucoes: this.addNewinstrucoes})
    .pipe(finalize(()=>this.isLoading = false))
    .subscribe({
      next: (data: any) => {    
        this.getMedicamentos();
        this.swapRemedioBox();
        this.addNewnome = this.addNewdosagem = this.addNewinstrucoes = "";

        this.showToast("Remedio Adicionado com Sucesso", true);
      },
      error: (error: any) =>{
        this.showToast("Error ao Remedio Adicionar Remedio", false);
      }
    });
  }

  getHorarios(nome: string){
    this.horarios = [];
    this.isLoading = true;
    this.httpHorarios.getHorarios(nome)
    .pipe(finalize(()=>this.isLoading = false))
    .subscribe({
      next: (data: any) => {    
        for(let h of data){
          this.horarios.push(h)
        }
        this.horarios.reverse()
        this.medAtual = nome
        this.swapHorariosBox()
      },
      error: (error: any) =>{
        this.showToast("Error ao buscar Horarios", false);
      }
    });
  }

  newHorario(){
    this.isLoading = true;
    this.httpHorarios.saveHorario({nomeMedicamento: this.medAtual})
    .pipe(finalize(()=>this.isLoading = false))
    .subscribe({
      next: (data: any) => {
        this.getHorarios(this.medAtual)
        this.swapHorariosBox()

        this.showToast("Horario Adicionado com Sucesso", true);
      },
      error: (error: any) =>{
        this.showToast("Error ao Salvar Horario", false);
      }
    });
  }

  deleteMedReq(nome: string){
    this.isLoading = true;
    this.httpMedicamento.deleteMedicamento(nome)
    .pipe(finalize(()=>this.isLoading = false))
    .subscribe({
      next: (data: any) => {
        this.getMedicamentos()

        this.showToast("Medicamento Deletado com Sucesso", true);
      },
      error: (error: any) =>{
        this.showToast("Error ao Deletar Remedio", false);
      }
    });
  }

  getInstrucoes(){
    for(let med of this.medicamentos){
      if(med.nome == this.medAtual){
        return med.instrucoes;
      }
    }
    return ""
  }

  deleteHorario(hora: string){
    this.isLoading = true;
    this.httpHorarios.deleteHorario(this.medAtual, hora)
    .pipe(finalize(()=>this.isLoading = false))
    .subscribe({
      next: (data: any) => {
        this.getHorarios(this.medAtual)
        this.swapHorariosBox()

        this.showToast("Horario Deletado com Sucesso", true);
      },
      error: (error: any) =>{
        this.showToast("Error ao Deletar Horario", false);
      }
    });
  }

  formatarDataDia(dataStr: string): string {
    const corrigida = dataStr.replace(/(\.\d{3})\d+/, '$1');
    const data = new Date(corrigida);
    return data.toLocaleString('pt-BR', {
      day : '2-digit',
      month : '2-digit'
    });
  }

  formatarDataHora(dataStr: string): string {
    const corrigida = dataStr.replace(/(\.\d{3})\d+/, '$1');
    const data = new Date(corrigida);
    return data.toLocaleString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
