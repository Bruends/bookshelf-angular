import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isCollapsed: boolean = true;
  isSearchBarVisible: boolean = this.uiService.isSearchBarVisible;

  constructor(
    private bookService: BookService,
    private uiService: UiService,   
  ) { }

  ngOnInit(): void {
    this.uiService.getSearchSubject()
      .subscribe(isVisible => { this.isSearchBarVisible = isVisible })
  }

  searchByTitle(search: string): void {
    this.bookService.searchByTitle(search);
  }
}
