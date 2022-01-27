import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from './service/auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(
    public auth: AuthService,
    private router: Router,
  ){}

  ngOnInit(){
    window.scroll(0, 0);

    // Validação de usuário logado
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }
  }

  // Função para limpar os dados do usuário e deslogar
  sair(){
    this.router.navigate(['/entrar'])
    environment.token = '';
    environment.foto = '';
    environment.id = 0;
    environment.nome = '';
  }

  // Togle menu lateral
  toggle(){
    $('#sidebar').toggleClass('active');
  }
  
}
