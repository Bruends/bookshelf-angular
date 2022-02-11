import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/types/Book';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss']
})
export class UpdateBookComponent implements OnInit {

  book: Book = {
    id: undefined,
    title: "",
    category: "",    
    description: "",   
    author: "",
    imgPath: "", 
  }

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) { }

  onFileChange(event: any) {
    this.book.img = event.target.files[0];
  }

  onSubmit(form: any) {
    console.log(this.book)
    this.api.updateBook(this.book)
      .subscribe(data => {
        console.log(data)        
      })
  }

  ngOnInit(): void {
    const paramSubscribe = this.route.params.subscribe(params => {
      const id = params["id"];

      if(!id)  
        this.router.navigate(['']);

      const findSubscribe = this.api.findBookById(id)
        .subscribe(book => {
          if(book)
            this.book = book;
            console.log(book)            
        })
    })
  }
}
