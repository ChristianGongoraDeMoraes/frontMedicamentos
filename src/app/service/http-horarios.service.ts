import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

type RequestHorario = {
  nomeMedicamento: string
}

@Injectable({
  providedIn: 'root'
})
export class HttpHorariosService {
  http = inject(HttpClient);
  url = "http://localhost:5274";

  constructor() { }
  getHeaders(){
     return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem("token")}`
    });
  }

  saveHorario(request: RequestHorario){
    let urlX: string = this.url +`/api/Horario`;
    const headers = this.getHeaders();
    return this.http.post(urlX, request, {headers});
  }

  getHorarios(nomeMedicamento: string){
    let urlX: string = this.url +`/api/Horario`;
    const headers = this.getHeaders();

    const params = new HttpParams()
      .set('nomeMedicamento', nomeMedicamento);

    return this.http.get(urlX, { headers , params });
  }
}
