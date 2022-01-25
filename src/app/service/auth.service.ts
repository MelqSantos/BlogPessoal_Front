import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from 'src/model/User';
import { UserLogin } from 'src/model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) {}
   
   // Observable garante que o Userlogin irá receber um Objeto do Tipo UserLogin
  entrar(userLogin: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>('https://ms-blog-pessoal.herokuapp.com/usuarios/logar', userLogin)
  }

  cadastrar(user: User):Observable<User>{
    return this.http.post<User>('https://ms-blog-pessoal.herokuapp.com/usuarios/cadastrar', user)
  }

  logado(){
    let ok: boolean = false;

    if(environment.token != ''){
      ok = true;
    } else{
      this.router.navigate(['/entrar']);
    }

    return ok
  }
}
