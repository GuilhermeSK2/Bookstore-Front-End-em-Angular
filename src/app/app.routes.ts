import { Routes } from '@angular/router';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { AllBooksComponent } from './pages/all-books/all-books.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';
import { EditBookComponent } from './pages/edit-book/edit-book.component';
import { AllPublishersComponent } from './pages/all-publishers/all-publishers.component';
import { AllAuthorsComponent } from './pages/all-authors/all-authors.component';
import { TableBooksComponent } from './pages/table-books/table-books.component';
import { TableStatusComponent } from './pages/table-status/table-status.component';

export const routes: Routes = [
    {
        path: '',
        component: AllBooksComponent
    },
    {
        path: 'tablebooks',
        component: TableBooksComponent
    },
    {
        path: 'tablestatus',
        component: TableStatusComponent
    },
    {
        path: 'AddBook',
        component: AddBookComponent
    },
    {
        path: 'DetailsBook',
        component: BookDetailsComponent
    },
    {
        path: 'EditBook/:id',
        component: EditBookComponent
    },
    {
        path: 'publishers',
        component: AllPublishersComponent
    },
    {
        path: 'authors',
        component: AllAuthorsComponent
    }
];
