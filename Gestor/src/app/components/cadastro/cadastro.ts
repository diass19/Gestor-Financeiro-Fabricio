import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MovimentacaoService } from '../../services/movimentacao';
import { Movimentacao } from '../../models/movimentacao';

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class Cadastro implements OnInit {

  private service = inject(MovimentacaoService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  id: string | null = null;

  movimentacao: Movimentacao = {
    descricao: '',
    tipo: 'receita',
    categoria: '',
    valor: 0,
    data: ''
  };

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.service.listar().subscribe({
        next: dados => {
          const encontrada = dados.find(m => m._id === this.id);

          if (encontrada) {
            this.movimentacao = {
              ...encontrada,
              data: encontrada.data.substring(0, 10)
            };
          } else {
            alert('Movimentação não encontrada.');
            this.router.navigate(['/lista']);
          }
        },
        error: () => {
          alert('Erro ao carregar movimentação.');
          this.router.navigate(['/lista']);
        }
      });
    }
  }

  salvar() {
    if (this.id) {
      this.service.atualizar(this.id, this.movimentacao).subscribe({
        next: () => {
          alert('Movimentação atualizada com sucesso!');
          this.router.navigate(['/lista']);
        },
        error: () => alert('Erro ao atualizar movimentação.')
      });
    } else {
      this.service.adicionar(this.movimentacao).subscribe({
        next: () => {
          alert('Movimentação cadastrada com sucesso!');
          this.router.navigate(['/lista']);
        },
        error: () => alert('Erro ao cadastrar movimentação.')
      });
    }
  }
}