import { Component } from '@angular/core';
import { FormEditComponent } from '../../books/components/form-edit/form-edit.component';
import { FormComponent } from '../../books/components/form/form.component';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [FormComponent, FormEditComponent],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent {

}
