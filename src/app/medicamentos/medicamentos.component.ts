import { Component, inject, OnInit } from '@angular/core';
import { HttpMedicamentoService } from '../service/http-medicamento.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { HttpHorariosService } from '../service/http-horarios.service';

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
  
  medAtual = "";

  horarios: Horario[] = []
  medicamentos: Medicamento[] = []

  showBoxAddMed = false;
  showHorarios = false;

  addNewnome: string = "";
  addNewdosagem: string = "";
  addNewinstrucoes: string = "";

  ngOnInit(): void {
    this.getMedicamentos();
    
  }


  getMedicamentos(){
    this.medicamentos = [];
    this.httpMedicamento.getMedicamento().subscribe({
        next: (data: any) => {    
          for(let med of data){
            this.medicamentos.push(med)
          }
          
        },
        error: (error: any) =>{
          alert("error");
        }
    });
  }

  swapRemedioBox(){
    this.showBoxAddMed = !this.showBoxAddMed;
  }
  swapHorariosBox(){
    this.showHorarios = !this.showHorarios;
  }

  saveNewRemedio(){
    if(!this.addNewnome) return;
    if(!this.addNewdosagem) return;
    if(!this.addNewinstrucoes ) return;

    this.httpMedicamento.saveMedicamento({nome: this.addNewnome, dosagem: this.addNewdosagem, instrucoes: this.addNewinstrucoes}).subscribe({
      next: (data: any) => {    
        this.getMedicamentos();
        this.swapRemedioBox();
        this.addNewnome = this.addNewdosagem = this.addNewinstrucoes = "";
      },
      error: (error: any) =>{
        alert("error");
      }
    });
  }

  getHorarios(nome: string){
    this.horarios = [];
    this.httpHorarios.getHorarios(nome).subscribe({
      next: (data: any) => {    
        for(let h of data){
          this.horarios.push(h)
        }
        this.horarios.reverse()
        this.medAtual = nome
        this.swapHorariosBox()
      },
      error: (error: any) =>{
        alert("error");
      }
    });
  }

  newHorario(){
    this.httpHorarios.saveHorario({nomeMedicamento: this.medAtual}).subscribe({
      next: (data: any) => {
        this.getHorarios(this.medAtual)
        this.swapHorariosBox()
      },
      error: (error: any) =>{
        alert("error");
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
