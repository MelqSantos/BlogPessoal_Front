import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from 'src/model/User';
import { UserLogin } from 'src/model/UserLogin';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {}

    token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }

    refreshToken(){
      this.token = {
        headers: new HttpHeaders().set('Authorization', environment.token)
      }
    }
   
   // Observable garante que o Userlogin irá receber um Objeto do Tipo UserLogin
  entrar(userLogin: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>('https://ms-blogpessoal.herokuapp.com/usuarios/logar', userLogin)
  }

  cadastrar(user: User):Observable<User>{
    return this.http.post<User>('https://ms-blogpessoal.herokuapp.com/usuarios/cadastrar', user)
  }

  atualizar(user: User):Observable<User>{
    return this.http.put<User>('https://ms-blogpessoal.herokuapp.com/usuarios/atualizar', user, this.token)
  }

  getByIdUser(id: number): Observable<User>{
  return this.http.get<User>(`https://ms-blogpessoal.herokuapp.com/usuarios/${id}`, this.token)
  }

  logado(){
    let ok: boolean = false

    if(environment.token != ''){
      ok = true
    }

    return ok
  }
}
