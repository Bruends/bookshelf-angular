import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/types/Book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

}