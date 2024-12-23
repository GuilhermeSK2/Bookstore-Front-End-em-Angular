import { Component, OnInit } from '@angular/core';
import { BookService } from '../../books/services/book.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { SelectItem, FilterService, FilterMatchMode, LazyLoadEvent, PrimeNGConfig } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'app-all-books',
  standalone: true,
  imports: [
    CommonModule, 
    CardModule, 
    ButtonModule, 
    RouterLink, 
    MessagesModule, 
    DropdownModule, 
    FormsModule, 
    TableModule,
  ],
  templateUrl: './table-books.component.html',
  styleUrls: ['./table-books.component.css']
})
export class TableBooksComponent implements OnInit {
  books: any[] = []; // Lista de livros para exibição
  searchValue: string = ''; // Valor da pesquisa global
  first: number = 0; // Controle para paginação
  rows = 10; // Número de registros por página
  totalRecords: number = 0; // Total de registros para paginação
  filters: any = {}; // Armazena os filtros aplicados
  matchModeOptions: SelectItem[] | undefined; 
  loading: boolean = true; // Controle de loading
  

  constructor(private bookService: BookService, private filterService: FilterService) {}

  ngOnInit(): void {
    this.loading = true; // Ativa o carregamento enquanto busca os dados
    // Inicialização dos filtros de pesquisa
    this.matchModeOptions = [ 
      {  
          label: 'Inicia com',  
          value: FilterMatchMode.STARTS_WITH  
      }, 
      {  
          label: 'Contém',  
          value: FilterMatchMode.CONTAINS  
      }, 
      {  
          label: 'Termina com',  
          value: FilterMatchMode.ENDS_WITH  
      }, 
      {  
          label: 'Igual',  
          value: FilterMatchMode.EQUALS  
      }, 
    ];
  }

  fetchBooks(event: TableLazyLoadEvent): void {
    // Preparar os parâmetros para a requisição
    const first = event.first ?? 0;  // Página atual
    const rows = event.rows ?? 10;    // Número de registros por página
  
    const filterValue = event.filters;
    
    // Filtros
    const filters = {
      isActive: this.filters.isActive,
      title: this.filters.title,  // Filtro de título
      authorName: this.filters['authorName'],
      publisherName: this.filters['publisherName'],
      startDate: this.filters['startDate'], // Novo filtro de data inicial
      endDate: this.filters['endDate']      // Novo filtro de data final
    };
  
    // Verificando e ajustando filtros
    if (filterValue?.['title'] && Array.isArray(filterValue['title']) && filterValue['title'][0]?.value) {
      filters.title = filterValue['title'][0].value;
    }
  
    if (filterValue?.['authorName'] && Array.isArray(filterValue['authorName']) && filterValue['authorName'][0]?.value) {
      filters.authorName = filterValue['authorName'][0].value;
    }
  
    if (filterValue?.['publisherName'] && Array.isArray(filterValue['publisherName']) && filterValue['publisherName'][0]?.value) {
      filters.publisherName = filterValue['publisherName'][0].value;
    }
  
    console.log('Filtros preparados para a busca:', filters);
  
    // Ajustando para passar paginação
    const page = Math.floor(first / rows);  // Cálculo da página (Primeira página começa com 0)
    const size = rows; // Tamanho da página
  
    // Chamando o serviço para buscar os livros, passando os filtros
    this.bookService.getBooks(
      filters.isActive,
      filters.title,
      filters.publisherName,
      filters.authorName,
      filters.startDate, // Passa o filtro de data inicial
      filters.endDate,   // Passa o filtro de data final
      page,
      size,
    ).subscribe(
      (data: any) => {
        this.books = data.content; // Atualiza a lista de livros
        this.totalRecords = data.totalElements; // Atualiza o total de registros
        this.loading = false; // Desativa o carregamento
        console.log('Livros recebidos:', data);
        console.log('Total de registros:', this.totalRecords);
      },
      (error) => {
        console.error('Erro ao buscar os livros:', error);
        this.loading = false; // Desativa o carregamento em caso de erro
      }
    );
  }
  

  // Função chamada ao realizar a pesquisa global
  onGlobalSearch(): void {
    if (this.searchValue) {
      this.filters.title = this.searchValue; // Adiciona o filtro de título
    } else {
      delete this.filters.title; // Remove o filtro de título se a busca estiver vazia
    }
    this.first = 0; // Reseta para a primeira página após a busca
    this.fetchBooks({ first: this.first, rows: this.rows }); // Recarrega os livros com os filtros
  }

  onFilterApply(event: any): void {
    if (this.searchValue) {
      this.filters.title = this.searchValue; // Adiciona o filtro de título
    } else {
      delete this.filters.title; // Remove o filtro de título se a busca estiver vazia
    }
    this.first = 0; // Reseta para a primeira página após a busca
    this.fetchBooks({ first: this.first, rows: this.rows }); // Recarrega os livros com os filtros
  }


  // Função para limpar filtros
  onFilterClear(field: string): void {
    delete this.filters[field]; // Remove o filtro do campo
    this.first = 0; // Reseta para a primeira página
    this.fetchBooks({ first: this.first, rows: this.rows });
  }

  // Função para resetar a pesquisa e filtros
  reset(): void {
    this.first = 0; // Reseta para a primeira página
    this.filters = {}; // Limpa todos os filtros
    this.fetchBooks({ first: this.first, rows: this.rows }); // Recarrega os livros sem filtros
  }

  // Função para avançar para a próxima página
  next(): void {
    this.first = this.first + this.rows;
  }

  // Função para voltar à página anterior
  prev(): void {
    this.first = this.first - this.rows;
  }

  // Verifica se é a primeira página
  isFirstPage(): boolean {
    return this.first === 0;
  }

  // Verifica se é a última página
  isLastPage(): boolean {
    return this.first >= this.totalRecords - this.rows;
  }

  // Função chamada quando a página muda
  pageChange(event: any): void {
    this.first = event.first; // Atualiza a página atual
    this.rows = event.rows;   // Atualiza o número de itens por página
  }
}
