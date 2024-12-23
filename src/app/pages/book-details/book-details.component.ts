import { Component } from '@angular/core';
import { FormEditComponent } from "../../books/components/form-edit/form-edit.component";
import { FormSearchComponent } from "../../books/components/form-search/form-search.component";

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [FormEditComponent, FormSearchComponent],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent {

}
