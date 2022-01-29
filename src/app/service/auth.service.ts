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

    // public usuario = {
    //   id: 0,
    //   nome: '',
    //   foto: ''
    // }

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

  getByIdUser(id: number): Observable<User>{
  return this.http.get<User>(`https://ms-blogpessoal.herokuapp.com/usuarios/${id}`, this.token)
  }

  // public refreshUsu(){
  //   this.usuario.id = environment.id
  //   this.usuario.nome = environment.nome
  //   this.usuario.foto = environment.foto

  //   return this.usuario
  // }

  logado(){
    let ok: boolean = false

    if(environment.token != ''){
      ok = true
      // this.refreshUsu()
    }

    return ok
  }
}
