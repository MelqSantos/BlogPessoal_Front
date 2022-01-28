import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from 'src/model/Tema';
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
    private temaService: TemaService
  ) { }

  ngOnInit(){
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }
  }

  cadastrar(){
    this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp;
      alert('Tema cadastrado com sucesso!')
      this.tema = new Tema()
    })
  }


}
