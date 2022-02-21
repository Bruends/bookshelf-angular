import { Component, OnInit } from '@angular/core';
import { Book } from 'src/types/Book';
import { ApiService } from '../services/api.service';
import { BookService } from '../services/book.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];

  constructor(    
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.bookService.getSubject()
      .subscribe(data => { this.books = data });

    this.bookService.getFromApi();
  }
}
