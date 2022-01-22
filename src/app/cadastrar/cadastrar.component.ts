import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  // Variáveis globais
  user: User = new User();
  confirmarSenha: string;
  tipoUsuario : string;

  constructor(
    private authService : AuthService,
    private router : Router
    ) { 
  }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmSenha(event: any){
    // Pega o valor do input Confirmar senha
    this.confirmarSenha =  event.target.value;
  }

  tipoUser(event: any){
    this.tipoUsuario =  event.target.value;
  }

  cadastrar(){
      this.user.tipo = this.tipoUsuario;

      if(this.user.senha != this.confirmarSenha){
        alert('As senhas não coincidem.')

      }else{
        /*Pega os valores inseridos na variável user,
        transforma em Json para que o Backend entenda a requisição*/
        this.authService.cadastrar(this.user).subscribe((resp: User) => {
          this.user = resp;
          // Redireciona o usuário
          this.router.navigate(['/entrar'])
          alert('Usuário cadastrado com sucesso!')
        })
      }
  }
}
