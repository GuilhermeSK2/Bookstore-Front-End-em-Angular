import { Component } from '@angular/core';
import { BookService } from '../../books/services/book.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormComponent } from "../../books/components/form/form.component";
import { FormEditComponent } from "../../books/components/form-edit/form-edit.component";
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, InputTextareaModule, FormComponent, FormEditComponent, CardModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {

  bookForm: FormGroup;
  mensagemSucesso = '';

  constructor(private fb: FormBuilder, private bookService: BookService) {

    this.bookForm = this.fb.group({
      title: [''],
      publisherId: [''],
      authorIds: [[]],
      reviewComment: ['']
    });
  }

  // Método para enviar os dados
  onSubmit() {
    const formData = { ...this.bookForm.value};
    
    // Enviando os dados para o serviço
    this.bookService.addBook(formData).subscribe((data) => {
      console.log('Dados recebidos:', data);
      this.bookForm.patchValue({
        title: data.title,
        publisherId: data.selectedPublisher,
        authorIds: data.selectedAuthors,
        reviewComment: data.review?.comment
      });
    });
  }
}
