import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from 'src/model/Tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[] 

  constructor(
    public router: Router,
    private temaService: TemaService,
    private alerta: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0, 0)
    
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.finAllTemas()
  }

  finAllTemas(){
    this.temaService.getAllTemas().subscribe((resp: Tema[]) =>{
      this.listaTemas = resp
    })
  }

  cadastrar(){
    this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp;
      this.alerta.showAlertSuccess('Tema cadastrado com sucesso!')
      this.finAllTemas()
      this.tema = new Tema()
    })
  }

}
