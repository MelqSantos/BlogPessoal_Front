import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from 'src/model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UserLogin = new UserLogin();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  entrar(){
    this.authService.entrar(this.userLogin).subscribe((resp: UserLogin) => {
      this.userLogin = resp

      
      environment.id = this.userLogin.id  
      environment.token = this.userLogin.token
      environment.nome = this.userLogin.nome
      environment.foto = this.userLogin.foto

      console.log(environment.token)

      this.router.navigate(['/menu'])
    }, erro => {
      // tratamento de erros
      if(erro.status == 500){
        alert('Usuário ou senha incorretos!')
      } if(erro.status == 401){
        alert('Usuário não autorizado!')
      }
    })
  }

}
