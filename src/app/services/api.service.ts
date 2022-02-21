import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, map, Observable } from 'rxjs';
import { Book } from 'src/types/Book';


@Injectable({
  providedIn: 'root'
})

export class ApiService {
  
  url: string = "http://localhost:3000/books";
  baseUrl: string = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url);      
  }

  findBookById(id: number): Observable<Book> {
    return this.http.get<Book>(this.url + '/find/' + id);
  }

  formDataFromBook(book: Book): FormData {
    const formData = new FormData();

    // appending the book attributes
    if(book.id)
      formData.append("id", book.id.toString());

    if(book.title)
      formData.append("title", book.title);

    if(book.description)
      formData.append("description", book.description);

    if(book.category)
      formData.append("category", book.category);

    if(book.author)
      formData.append("author", book.author);
    
    if(book.img)
      formData.append("img", book.img, book.img.name);
    
    if(book.imgPath)
      formData.append("imgPath", book.imgPath);

    return formData;
  }

  postBook(book: Book): Observable<Book> {
    const formData = this.formDataFromBook(book);    
    return this.http.post<Book>(this.url, formData).pipe(first());
  }
  
  updateBook(book: Book): Observable<Book> {   
    const formData = this.formDataFromBook(book);      
    return this.http.put<Book>(this.url, formData).pipe(first());
  }
}
