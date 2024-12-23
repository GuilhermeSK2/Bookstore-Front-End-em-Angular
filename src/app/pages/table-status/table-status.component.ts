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
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { CalendarModule } from 'primeng/calendar';

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
    TagModule,
    RatingModule,
    CalendarModule
  ],
  templateUrl: './table-status.component.html',
  styleUrls: ['./table-status.component.css']
})
export class TableStatusComponent implements OnInit {
  books: any[] = []; // Lista de livros para exibição
  searchValue: string = ''; // Valor da pesquisa global
  first: number = 0; // Controle para paginação
  rows = 10; // Número de registros por página
  totalRecords: number = 0; // Total de registros para paginação
  filters: any = {}; // Armazena os filtros aplicados
  loading: boolean = true; // Controle de loading
  filterValue: any;

  stDate: any;
  edDate: any;
  
  statusOptions = [
    { label: 'Todos', value: null },
    { label: 'Ativo', value: true },
    { label: 'Inativo', value: false }
  ];

  constructor(private bookService: BookService, private filterService: FilterService) {}

  ngOnInit(): void {
    this.loading = true; // Ativa o carregamento enquanto busca os dados
    // Inicialização dos filtros de pesquisa
    this.fetchBooks({ first: this.first, rows: this.rows });
  }

  fetchBooks(event: TableLazyLoadEvent): void {
    const first = event.first ?? 0;  // Página atual
    const rows = event.rows ?? 10;  // Número de registros por página
    
    const filterValue = event.filters;

    if (this.stDate) {
      const formattedDate = this.formatStartDate(this.stDate);
      console.log('Data inicial formatada:', formattedDate);
    } else if (this.edDate) {
      const formattedDate = this.formatEndDate(this.edDate);
      console.log('Data limite formatada:', formattedDate);
    }

    // Preparar os filtros
    const filters = {
      isActive: this.filters.isActive,
      title: this.filters.title,
      publisherName: this.filters.publisherName,
      authorName: this.filters['authorName'],
      startDate: this.stDate ? this.formatStartDate(this.stDate) : null,
      endDate: this.edDate ? this.formatEndDate(this.edDate) : null,
    };

    if (filterValue?.['authorName'] && Array.isArray(filterValue['authorName']) && filterValue['authorName'][0]?.value) {
      filters.authorName = filterValue['authorName'][0].value;
    }

    console.log('Filtros preparados para a busca:', filters);
  
    // Ajustando para passar paginação
    const page = Math.floor(first / rows);
    const size = rows;

    this.bookService.getBooks(
      filters.isActive,
      filters.title,
      filters.publisherName,
      filters.authorName,
      filters.startDate, 
      filters.endDate,
      page,
      size,
    ).subscribe(
      (data: any) => {
        this.books = data.content;
        this.totalRecords = data.totalElements;
        this.loading = false;
        console.log('Livros recebidos:', data);
      },
      (error) => {
        console.error('Erro ao buscar os livros:', error);
        this.loading = false;
      }
    );
  }

  formatDate(date: Date, time: string): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  

  formatStartDate(date: Date): string {
    return this.formatDate(date, '00:00:00');
  }
  
  formatEndDate(date: Date): string {
    return this.formatDate(date, '23:59:59');
  }
  

  reset(): void {
    this.first = 0;
    this.filters = {};
    this.fetchBooks({ first: this.first, rows: this.rows });
  }

  next(): void {
    this.first = this.first + this.rows;
  }

  prev(): void {
    this.first = this.first - this.rows;
  }

  isFirstPage(): boolean {
    return this.first === 0;
  }

  isLastPage(): boolean {
    return this.first >= this.totalRecords - this.rows;
  }

  pageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
  }
}
