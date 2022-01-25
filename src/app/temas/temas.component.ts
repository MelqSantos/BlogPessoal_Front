import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(){
    // if(environment.token == ''){
    //   alert('Sua Seção expirou, faça o login novamente.')
    //   this.router.navigate(['/entrar'])
    // }
  }

}
