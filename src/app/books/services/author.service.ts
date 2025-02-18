import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
    })
    
    export class AuthorService {
    private apiUrl = 'http://localhost:8080/bookstore/authors'
    
    constructor(private http: HttpClient) { }
    
    getAuthors(): Observable<any> {
        return this.http.get<any>(this.apiUrl);
    }
}