import { Component, OnInit } from '@angular/core';
import { Book } from 'src/types/Book';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getAllBooks()    
      .subscribe(data => {
        this.books = data.map(book => {
          if(book.imgPath){
            book.imgPath = this.api.baseUrl + book.imgPath;
          } else {
            book.imgPath = "/assets/placeholder.jpg";
          }

          console.log(book)
          return book;
        })
        console.log(data)
      })
  }

}
