import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movimentacao } from '../models/movimentacao';

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {

  private http = inject(HttpClient);
  private api = 'http://localhost:3000/movimentacoes';

  listar() {
    return this.http.get<Movimentacao[]>(this.api);
  }

  adicionar(movimentacao: Movimentacao) {
    return this.http.post<Movimentacao>(
      this.api, movimentacao
    );
  }

  atualizar(id: string, movimentacao: Movimentacao) {
    return this.http.put<Movimentacao>(
      `${this.api}/${id}`, movimentacao
    );
  }

  remover(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }
}