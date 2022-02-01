import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-comunidade',
  templateUrl: './comunidade.component.html',
  styleUrls: ['./comunidade.component.css']
})
export class ComunidadeComponent implements OnInit {

  user: User = new User()
  listaUsers : User[]

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    this.authService.refreshToken()
    this.findAllUser()
  }

  findAllUser(){
    this.authService.getAllUsers().subscribe((resp: User[]) => {
      this.listaUsers = resp
    })
  }

}
