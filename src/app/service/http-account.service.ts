import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

type RequestRegister = {
  username: string,
  email: string,
  password: string
}
type RequestLogin = {
  username: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class HttpAccountService {
  http = inject(HttpClient);
  url = "http://localhost:5274";

  constructor() { }

  register(request: RequestRegister){
    let urlX: string = this.url +`/api/account/register`;
    return this.http.post(urlX, request);
  }

  login(request: RequestLogin){
    let urlX: string = this.url +`/api/account/login`;
    return this.http.post(urlX, request);
  }
}
