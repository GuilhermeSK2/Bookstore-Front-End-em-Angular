import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface BookModel {
    id: number;
    title: string;
    publisher: string;
    authors: string[];
    isActive: boolean;
}

@Injectable({
    providedIn: 'root'
    })
    
    export class BookService {
    private apiUrl = 'http://localhost:8080/bookstore/books'

    
    constructor(private http: HttpClient) { }
    
    getBooksByStatus(isActive?: boolean | 'all'): Observable<any> {
        let url = this.apiUrl;
    
        // Se isActive for um valor booleano (true ou false), passamos ele diretamente
        if (isActive === true || isActive === false) {
            url += `/status?isActive=${isActive}`;
        } 
        // Se isActive for undefined ou null, é passado a URL sem valor para o status o que retorna todos os livros
        else {
            url += `/status`;
        }
        return this.http.get<any>(url);
    }

    getBooks(
        isActive: boolean | null = null,
        title: string = '',
        publisher: string = '',
        author: string = '',
        startDate: string | null = null, // Novo parâmetro para data de início
        endDate: string | null = null, // Novo parâmetro para data de término
        page: number = 0, // Página padrão
        size: number = 10, // Tamanho da página padrão
        sort: string = 'title', // Ordenação padrão
        sortField: string = 'createdAt', // Campo de ordenação padrão
    sortDirection: string = 'ASC' // Direção de ordenação padrão
    ): Observable<BookModel[]> {
        let params = new HttpParams()
            .set('isActive', isActive !== null ? isActive.toString() : '')
            .set('title', title)
            .set('publisher', publisher)
            .set('author', author)
            .set('startDate', startDate !== null ? startDate.toString() : "01/01/2000 00:00:00") // Adiciona a data de início
            .set('endDate', endDate !== null ? endDate.toString() : "01/01/2200 00:00:00") // Adiciona a data de término
            .set('page', page) // Adiciona o número da página
            .set('size', size) // Adiciona o tamanho da página
            .set('sortField', sortField) // Adiciona o campo de ordenação
            .set('sortDirection', sortDirection); // Adiciona a direção de ordenação
    
        return this.http.get<BookModel[]>(this.apiUrl, { params });
    }
    

    addBook(bookData: any): Observable<any> {
        return this.http.post<any>(this.apiUrl+'/publisher/publishers', bookData);
    }

    getBookByIdOrTitle(query: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/search?query=${query}`);
    }

    getBookById(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    deleteBookById(id: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

    updateBook(id: string, book: any): Observable<any>{
        return this.http.put(`${this.apiUrl}/${id}`, book);
    }

    updateStatus(id: string, status: boolean): Observable<any>{
        return this.http.put(`${this.apiUrl}/${id}/status?isActive=`, status);
    }
}