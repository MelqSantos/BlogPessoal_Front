import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    nome = environment.nome;
    foto = environment.foto;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    public authService: AuthService
    ) {}

  ngOnInit(){
    if(environment.token == ''){
      alert('Sua Seção expirou, faça o login novamente.')
      this.router.navigate(['/entrar'])
    }
  }

  sair(){
    this.router.navigate(['/entrar'])
    environment.token = '';
    environment.foto = '';
    environment.id = 0;
    environment.nome = '';
  }

}
