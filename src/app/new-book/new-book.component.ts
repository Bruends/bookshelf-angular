import { Component, OnInit } from '@angular/core';
import { Book } from 'src/types/Book';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss']
})
export class NewBookComponent implements OnInit {

  book: Book = {
    title: "",
    category: "none",    
    description: "",    
  }

  constructor(private api: ApiService) { }

  onFileChange(event: any) {
    this.book.img = event.target.files[0];
  }

  onSubmit(form: any) {
    console.log(this.book)
    this.api.postBook(this.book)
      .subscribe(data => {
        console.log(data)
        
      })
  }

  ngOnInit(): void {
  }

}
