import { Routes } from '@angular/router';
import { Cadastro } from './components/cadastro/cadastro';
import { Lista } from './components/lista/lista';

export const routes: Routes = [
  { path: '', redirectTo: 'lista', pathMatch: 'full' },
  { path: 'cadastro', component: Cadastro },
  { path: 'cadastro/:id', component: Cadastro },
  { path: 'lista', component: Lista }
];