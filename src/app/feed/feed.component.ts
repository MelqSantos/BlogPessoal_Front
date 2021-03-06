import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from 'src/model/Postagem';
import { Tema } from 'src/model/Tema';
import { User } from 'src/model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  tema: Tema = new Tema()
  postagem: Postagem = new Postagem()
  user: User = new User()
  
  nome = environment.nome;
  idUser = environment.id
  idTema: number
  
  listaTemas: Tema[]
  listaPostagens: Postagem[]
  
  // Order pipe
  key = 'data'
  reverse = true

  tituloPost: string
  descTema: string

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService,
    private alerta: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.authService.refreshToken();
    this.getAllTemas();
    this.getAllPostagens();
  }

  getAllTemas(){
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: User) => {
      this.user = resp
    })
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.alerta.showAlertSuccess('Postagem realizada com sucesso!')
      this.postagem = new Postagem()
      this.getAllPostagens()
    })
  }

  findByTituloPostagem(){
    
    if(this.tituloPost == ""){
      this.getAllPostagens()
    } else{
      
      this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[]) => {
        this.listaPostagens = resp
      })
    }

  }

  findByTema(){
    if(this.descTema == ""){
      this.getAllTemas()
    } else{

      this.temaService.getByNomeTema(this.descTema).subscribe((resp: Tema[]) => {
        this.listaTemas = resp

      })
    }
  }
  
}
