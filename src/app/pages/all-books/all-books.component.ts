import { Component, OnInit } from '@angular/core';
import { BookService } from '../../books/services/book.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { FormEditComponent } from '../../books/components/form-edit/form-edit.component';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-all-books',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    RouterLink,
    FormEditComponent,
    MessagesModule,
    DropdownModule,
    FormsModule,
    TableModule,
    InputTextModule,
    InputIconModule,
    PaginatorModule,
  ],
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css'],
})
export class AllBooksComponent implements OnInit {
  books: any[] = []; // Lista de livros retornados
  bookEdit: any = null; // Dados do livro para edição
  deleteSuccess: string = ''; // Mensagem de sucesso para exclusão
  currentView: 'all' | 'true' | 'false' = 'all'; // Filtro ativo
  searchValue: string = ''; // Filtro por título
  publisherValue: string = ''; // Filtro por editora
  authorValue: string = ''; // Filtro por autor
  messages: Message[] | undefined; // Mensagens para exibição de erros ou sucesso

 // Paginação
  page: number = 0; // Página atual
  size: number = 10; // Tamanho da página
  totalRecords: number = 0; // Total de livros

  filterOptions = [
    { label: 'Todos os Livros', value: 'all' },
    { label: 'Livros Ativos', value: 'true' },
    { label: 'Livros Inativos', value: 'false' },
  ];

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.updateBooksList();
  }

  /**
   * Atualiza a lista de livros com base nos filtros selecionados.
   */
  updateBooksList(): void {
    const params = {
      isActive: this.currentView === 'all' ? undefined : this.currentView === 'true',
      title: this.searchValue || undefined,
      publisher: this.publisherValue || undefined,
      author: this.authorValue || undefined,
    };

    this.bookService.getBooks(params.isActive, params.title, params.publisher, params.author).subscribe({
      next: (books) => {
        this.books = books;
      },
      error: (error) => {
        console.error('Erro ao carregar os livros:', error);
        this.books = [];
      },
    });
  }

  /**
   * Limpa os campos de busca e atualiza a lista de livros.
   */
  clearSearch(): void {
    this.searchValue = '';
    this.publisherValue = '';
    this.authorValue = '';
    this.updateBooksList();
  }

  /**
   * Exclui um livro pelo ID e atualiza a lista.
   * @param id ID do livro a ser excluído
   */
  excluirLivro(id: string): void {
    this.bookService.deleteBookById(id).subscribe({
      next: () => {
        console.log(`Livro com ID ${id} excluído com sucesso`);
        this.books = this.books.filter((book) => book.id !== id);
        this.deleteSuccess = 'Livro deletado com sucesso!';
      },
      error: (error) => {
        console.error(`Erro ao excluir o livro com ID ${id}:`, error);
        this.deleteSuccess = 'Erro ao deletar o livro!';
      },
    });
  }

  /**
   * Navega para a tela de edição de um livro.
   * @param bookData Dados do livro a ser editado
   */
  editarLivro(bookData: any): void {
    this.bookEdit = {
      id: bookData.id,
      title: bookData.title,
      reviewComment: bookData.reviewComment,
    };
    this.router.navigate(['/EditBook', bookData.id]);
  }

  /**
   * Realiza a busca com base nos filtros preenchidos.
   */
  searchBooks(): void {
    this.updateBooksList();
  }

  /**
   * Atualiza a lista com base no filtro de status.
   * @param status Filtro selecionado ('all', 'true', 'false')
   */
  onFilterChange(status: string): void {
    this.currentView = status as 'all' | 'true' | 'false';
    this.updateBooksList();
  }
}
