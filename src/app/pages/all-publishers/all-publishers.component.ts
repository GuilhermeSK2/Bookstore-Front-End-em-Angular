import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { FormEditComponent } from "../../books/components/form-edit/form-edit.component";
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { PublisherService } from '../../books/services/publisher.service';

@Component({
  selector: 'app-all-publishers',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, RouterLink, FormEditComponent, MessagesModule],
  templateUrl: './all-publishers.component.html',
  styleUrls: ['./all-publishers.component.css']
})
export class AllPublishersComponent implements OnInit {
  publishers: any[] = []; //Coleção de livros
  publisherEdit: any = null; //Variável para armazenar o livro que vai ser editado
  deleteSuccess: string = '';//onde a mensagem de exclusão bem sucedida será armazenada

  messages: Message[] | undefined;

  constructor(private publisherService: PublisherService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.getAllPublishers();
  }

  addMessages() {
    this.messages = [
        { severity: 'info', summary: 'Dynamic Info Message' },
        { severity: 'success', summary: 'Dynamic Success Message' },
        { severity: 'warn', summary: 'Dynamic Warning Message' }
    ];
}

getAllPublishers(): void {
    this.publisherService.getPublishers().subscribe({
    next: (response) => {
        this.publishers = response; //retorna os livros que foram encontrados
        console.log('Dados recebidos:', response);
      },
    error: (error) => { //retorna erro caso a operação não tenha sido efetuada com sucesso
        console.error('Erro ao obter dados:', error);
      }
    });
  }

  /*excluirPublisher(id: string): void {
    this.publisherService.deletePublisherById(id).subscribe({
      next: () => {
        console.log(`Livro com ID ${id} excluído com sucesso`);
        this.publishers = this.publishers.filter(publisher => publisher.id !== id);
      },
      error: (error) => {
        console.error(`Erro ao excluir o livro com ID ${id}:`, error);
        this.deleteSuccess = 'Livro deletado com sucesso!';
      }
    });
  }*/

  /*editarPublisher(publisherData: any): void {
    this.publisherEdit = { ...publisherData };  // Clona o livro para edição
    this.router.navigate(['/EditBook', publisherData.id]);  // Redireciona para o formulário de edição
    console.log(publisherData.id);
    console.log(publisherData.title);
    console.log(publisherData.publisherId);
    console.log(publisherData.authorsIds);
    console.log(publisherData.reviewComment);
  }*/
}
