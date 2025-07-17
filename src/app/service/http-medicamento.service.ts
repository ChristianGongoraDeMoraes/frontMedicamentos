import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

type RequestMedicamento = {
  nome: string,
  dosagem: string,
  instrucoes: string
}

@Injectable({
  providedIn: 'root'
})
export class HttpMedicamentoService {
  http = inject(HttpClient);
  url = "http://localhost:5274";

  constructor() { }

  getHeaders(){
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
  }

  saveMedicamento(request: RequestMedicamento){
    let urlX: string = this.url +`/api/Medicamento`;
    const headers = this.getHeaders();
    return this.http.post(urlX, request, { headers });
  }

  getMedicamento(){
    let urlX: string = this.url +`/api/Medicamento`;
    const headers = this.getHeaders();
    return this.http.get(urlX, { headers });
  }
}
