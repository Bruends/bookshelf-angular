import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from 'src/types/Book';
import { ApiService } from './api.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private api: ApiService, private toast: ToastrService) { }

  booksSubject: Subject<Book[]> = new Subject();
  books: Book[];

  getSubject(): Subject<Book[]> {
    return this.booksSubject;
  }

  searchByTitle(search: string): void {
    if(search) {
      const searchResult = this.books.filter(book => {
        let titleLowerCase = book.title.toLowerCase();
        let searchLowerCase = search.toLowerCase();
  
        return titleLowerCase.includes(searchLowerCase);
      });
  
      this.booksSubject.next(searchResult);
    } else {
      this.booksSubject.next(this.books); 
    }
  }

  getFromApi(): void {  
    
    this.api.getAllBooks()
      .subscribe({        
        next: (data) => {
          this.books = data.map(book => {
            // adding api url to img path
            if(book.imgPath)
              book.imgPath = this.api.baseUrl + book.imgPath;

            return book;
          })

          this.booksSubject.next(this.books);
        },
        
        error: (error) => {
          console.log(error);
          this.toast.error('Erro ao buscar livros, tente novamente mais tarde.', 'Erro:');
        }
      })
  }
}
