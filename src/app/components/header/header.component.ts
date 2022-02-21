import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isCollapsed: boolean = true;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
  }

  searchByTitle(search: string): void {
    this.bookService.searchByTitle(search);
  }
}
