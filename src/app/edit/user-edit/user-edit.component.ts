import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';
import { User } from 'src/model/User';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user : User = new User()
  confirmarSenha: string;
  tipoUsuario : string;
  idUser: number;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alerta: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0, 0)

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    } 

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }

  confirmSenha(event: any){
    this.confirmarSenha =  event.target.value;
  }

  tipoUser(event: any){
    this.tipoUsuario =  event.target.value;
  }

  atualizar(){
    this.user.tipo = this.tipoUsuario;

      if(this.user.senha != this.confirmarSenha){
        this.alerta.showAlertWarning('As senhas não coincidem.')
      }else{
        this.authService.atualizar(this.user).subscribe((resp: User) => {
          this.user = resp;
          
          this.alerta.showAlertSuccess('Usuário atualizado com sucesso, faça o login novamente!')
          environment.token = ''
          environment.nome = ''
          environment.foto = ''
          environment.id = 0

          this.router.navigate(['/entrar'])
        })
      }
  }

  findByIdUser(id: number){
    this.authService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp
    })
  }

}
