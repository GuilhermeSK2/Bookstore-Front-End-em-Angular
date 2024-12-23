import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-form-edit',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputGroupModule, InputGroupAddonModule, InputTextModule, InputTextareaModule, ReactiveFormsModule, FormsModule, CardModule],
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent{
  book: any = {
    id: '',
    title: '',
    reviewComment: '',
  };

  statusMessage: string = '';//Onde vai ser armazenada a mensagem de sucesso

  constructor(private route: ActivatedRoute, private bookService: BookService,) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.getBookById(id).subscribe((data) => {
        console.log('Dados recebidos:', data);
      this.book = {
        id: data.id,
        title: data.title,
        //publisherId: data.publisher?.id,  // Acessando o ID do publisher
        //authorIds: data.authors?.map((author: any) => author.id),  // Extraindo os IDs dos autores
        reviewComment: data.review?.comment,  // Acessando o comentário da review
        };
      });
    }
  }

  atualizarLivro(): void {
    this.bookService.updateBook(this.book.id, this.book).subscribe({
      next: () => {
        this.statusMessage = 'Livro atualizado com sucesso!'; // Define a mensagem de sucesso
        console.log('Livro atualizado com sucesso');
        console.log('Dados do Livro', this.book);
      },
      error: (error) => {
        console.error('Erro ao atualizar o livro:', error);
        if (error.status === 400) {
          this.statusMessage = 'ID de livro não existente!';
        } else if (error.status === 500) {
          this.statusMessage = 'Erro no servidor. Tente novamente mais tarde.';
        } else {
          this.statusMessage = 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
        }
      }
  });
  }
}
