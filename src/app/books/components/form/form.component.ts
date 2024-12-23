import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BookService } from '../../services/book.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { PublisherService } from '../../services/publisher.service';
import { AuthorService } from '../../services/author.service';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, InputTextareaModule, ButtonModule, CardModule, DropdownModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{
  bookForm: FormGroup;
  statusMessage: string = '';//Onde vai ser armazenada a mensagem de sucesso
  publishers = [];
  authors = [];
  selectedPublisher = '';
  selectedAuthors = [[]];

  constructor(private fb: FormBuilder, private bookService: BookService, private publisherService: PublisherService, private authorService: AuthorService) {
    // Inicializando o formulário
    this.bookForm = this.fb.group({
      title: [''],
      publisherId: [''],
      authorIds: [''], // Inicialize como string, depois transformamos em array
      reviewComment: ['']
    });
  }

    ngOnInit() {
      //Fazendo get das editoras e dos autores para aparecerem no dropdown
      this.getAllPublishers();
      this.getAllAuthors();
    }


    //metodo para buscar todas as editoras
    getAllPublishers(): void {
      this.publisherService.getPublishers().subscribe({
      next: (response) => {
          this.publishers = response; //retorna as editoras que foram encontradas
          console.log('Dados recebidos:', response);
        },
      error: (error) => { //retorna erro caso a operação não tenha sido efetuada com sucesso
          console.error('Erro ao obter dados:', error);
        }
      });
    }

    //metodo para buscar todos os autores
    getAllAuthors(): void {
      this.authorService.getAuthors().subscribe({
      next: (response) => {
          this.authors = response; //retorna os autores que foram encontrados
          console.log('Dados recebidos:', response);
        },
      error: (error) => { //retorna erro caso a operação não tenha sido efetuada com sucesso
          console.error('Erro ao obter dados:', error);
        }
      });
    }

  // Método para enviar os dados
  onSubmit() {
    //Atribuindo que o valor de authorIds e publisherId com os respectivos ids no formulario
    const formData = { ...this.bookForm.value, authorIds: [this.bookForm.value.authorIds.id], publisherId: this.bookForm.value.publisherId.id};
    
    // Enviando os dados para o serviço
    this.bookService.addBook(formData).subscribe(
      (response) => {
        console.log('Livro adicionado com sucesso:', response);
        this.statusMessage = 'Livro cadastrado com sucesso!'; // Define a mensagem de sucesso
      },
      (error) => {
        console.error('Erro ao adicionar livro:', error);
        // Verifica o status do erro e define a mensagem de acordo com o caso
    if (error.status === 400) {
      this.statusMessage = 'Dados inválidos. Por favor, verifique os campos do formulário.';
    } else if (error.status === 401) {
      this.statusMessage = 'Acesso não autorizado. Faça login para adicionar um livro.';
    } else if (error.status === 404) {
      this.statusMessage = 'API não encontrada. Verifique a URL de requisição.';
    } else if (error.status === 500) {
      this.statusMessage = 'Erro no servidor. Tente novamente mais tarde.';
    } else {
      this.statusMessage = 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
    }
      }
    );
  }
}
