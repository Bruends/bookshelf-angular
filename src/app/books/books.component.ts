import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  bookToDelete: Book;
  modalRef: BsModalRef;

  constructor(    
    private bookService: BookService,
    private modalService: BsModalService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.bookService.getSubject()
      .subscribe(data => { this.books = data });

    this.bookService.getAllFromApi();
  }

  deleteBook(book: Book, modalTemplate: TemplateRef<any>): void {
    this.bookToDelete = book;
    this.modalRef = this.modalService.show(modalTemplate, { class: 'modal-sm' });
  }

  confirm(): void {
    this.bookService.deleteFromApi(this.bookToDelete);

    this.modalRef?.hide();
  }
 
  decline(): void {
    this.modalRef?.hide();
  }
}
