import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AddBookComponent } from "./pages/add-book/add-book.component";
import { HeaderComponent } from "./books/components/header/header.component";
import { FormComponent } from "./books/components/form/form.component";
import { ButtonModule } from 'primeng/button';
import { AllBooksComponent } from "./pages/all-books/all-books.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, AddBookComponent, HeaderComponent, FormComponent, ButtonModule, AllBooksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bookstore-front-end';
  exibirFormulario = true;

  mostrarFormulario() {
    this.exibirFormulario = true;
  }

  // Função para voltar para a lista
  mostrarLista() {
    this.exibirFormulario = false;
  }
}
