import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { ComunidadeComponent } from './comunidade/comunidade.component';
import { PostagemDeleteComponent } from './delete/postagem-delete/postagem-delete.component';
import { TemaDeleteComponent } from './delete/tema-delete/tema-delete.component';
import { PostagemEditComponent } from './edit/postagem-edit/postagem-edit.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { UserEditComponent } from './edit/user-edit/user-edit.component';
import { EntrarComponent } from './entrar/entrar.component';
import { FeedComponent } from './feed/feed.component';
import { SobreComponent } from './sobre/sobre.component';
import { TemasComponent } from './temas/temas.component';

const routes: Routes = [
  {path: '', redirectTo: 'entrar', pathMatch: 'full'},
  {path: 'entrar', component: EntrarComponent},
  {path: 'cadastrar', component: CadastrarComponent},
  {path: 'feed', component: FeedComponent},
  {path: 'temas', component: TemasComponent},
  {path: 'comunidade', component: ComunidadeComponent},
  {path: 'sobre', component: SobreComponent},

  {path: 'tema-edit/:id', component: TemaEditComponent},
  {path: 'tema-delete/:id', component: TemaDeleteComponent},
  {path: 'postagem-edit/:id', component: PostagemEditComponent},
  {path: 'postagem-delete/:id', component: PostagemDeleteComponent},
  {path: 'user-edit/:id', component: UserEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
