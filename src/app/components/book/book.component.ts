import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/types/Book';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() book: Book;
  @Output() deleteEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  onDelete(book: Book): void {
    this.deleteEvent.emit(book);
  } 
  
}
