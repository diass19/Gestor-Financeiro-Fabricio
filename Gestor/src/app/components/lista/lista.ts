import { Component, inject, OnInit, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MovimentacaoService } from '../../services/movimentacao';
import { Movimentacao } from '../../models/movimentacao';

@Component({
  selector: 'app-lista',
  imports: [CurrencyPipe, DatePipe, FormsModule],
  templateUrl: './lista.html',
  styleUrl: './lista.css'
})
export class Lista implements OnInit {

  private service = inject(MovimentacaoService);
  private router = inject(Router);

  movimentacoes = signal<Movimentacao[]>([]);

  categoriaSelecionada = '';

  cores = [
    '#ffd6e5',
    '#d8f3dc',
    '#e5d4ff',
    '#fff0b3',
    '#cce5ff',
    '#ffdab9'
  ];

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.service.listar().subscribe({
      next: dados => this.movimentacoes.set(dados),
      error: () => alert('Erro ao listar movimentações.')
    });
  }

  get categorias() {
    return [...new Set(
      this.movimentacoes().map(m => m.categoria)
    )];
  }

  get movimentacoesFiltradas() {
    if (this.categoriaSelecionada === '') {
      return this.movimentacoes();
    }

    return this.movimentacoes().filter(
      m => m.categoria === this.categoriaSelecionada
    );
  }

  corCategoria(categoria: string) {
    const indice = this.categorias.indexOf(categoria);
    return this.cores[indice % this.cores.length];
  }

  editar(id: string) {
    this.router.navigate(['/cadastro', id]);
  }

  remover(id: string) {
    if (confirm('Deseja excluir esta movimentação?')) {
      this.service.remover(id).subscribe({
        next: () => this.listar(),
        error: () => alert('Erro ao excluir.')
      });
    }
  }

  get receitas() {
    return this.movimentacoes()
      .filter(m => m.tipo === 'receita')
      .reduce((total, m) => total + m.valor, 0);
  }

  get despesas() {
    return this.movimentacoes()
      .filter(m => m.tipo === 'despesa')
      .reduce((total, m) => total + m.valor, 0);
  }

  get saldo() {
    return this.receitas - this.despesas;
  }
}