import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TagModule } from 'primeng/tag';
import { BookService } from '../../services/book.service';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-form-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, InputTextareaModule, ButtonModule, TagModule, CardModule],
  templateUrl: './form-search.component.html',
  styleUrl: './form-search.component.css'
})
export class FormSearchComponent {
  bookForm: FormGroup;
    books: any[] = [];
    statusMessage: string = '';

    constructor(private fb: FormBuilder, private bookService: BookService) {
        this.bookForm = this.fb.group({
            query: ['']
        });
    }

    fetchBookById() {
      const query = this.bookForm.get('query')?.value;//atribuindo o valor passado no input para a variável que será utilizada como parâmetro

      this.bookService.getBookByIdOrTitle(query).subscribe(
          (response) => {
              console.log('Resposta da API:', response); // Verifica a resposta da API
              this.books = response;
              this.statusMessage = '';
          },
          (error) => {
              console.error('Erro ao buscar o livro:', error);
              this.books = [];
              this.statusMessage = 'Livro não encontrado!';
          }
      );
  }
}
