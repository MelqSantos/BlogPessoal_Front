import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from './service/auth.service';
import { AlertasService } from './service/alertas.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  usuario = {
    id: 0,
    nome : '',
    foto : ''
  }

  constructor(
    public auth: AuthService,
    private router: Router,
    private alerta: AlertasService
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
    this.alerta.showAlertSuccess('Usuário deslogado com sucesso!')
    environment.token = '';
    environment.foto = '';
    environment.id = 0;
    environment.nome = '';
  }

  // Togle menu lateral
  toggle(){
    $('#sidebar').toggleClass('active');
  }

  // Função que busca os dados do usuário e insere no menu lateral.
  usuarioLogado(){
    if(environment.token != ''){
      
      this.usuario.id = environment.id
      this.usuario.nome = environment.nome
      this.usuario.foto = environment.foto

      $('#nameUser').html(this.usuario.nome);
      $('#user').css("background-image", "url(" + this.usuario.foto + ")");
    }
  }
  
}
