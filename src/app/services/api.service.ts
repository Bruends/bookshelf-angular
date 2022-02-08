import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/types/Book';


// const options = {
//   headers : new HttpHeaders({
//     'Content-Type' : 'multipart/form-data; Boundary=',
//     'Boundary' : ''
//   })
// }

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  

  url: string = "http://localhost:3000/imgup";


  constructor(private http: HttpClient) { }

  postBook(book: Book): Observable<Book> {

    const formData = new FormData();

    // appending the book attributes
    if(book.title)
      formData.append("title", book.title);

    if(book.description)
      formData.append("description", book.description);

    if(book.category)
      formData.append("category", book.category);
    
    if(book.img)
      formData.append("img", book.img, book.img.name);
  
    return this.http.post<Book>(this.url, formData);
  }
}