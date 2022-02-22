import { Component, OnInit } from '@angular/core';
import { Book } from 'src/types/Book';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss']
})
export class NewBookComponent implements OnInit {

  book: Book = {
    title: "",
    author: "",
    description: "",    
  }

  imgPreview: any;

  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    // only accept images
    if(event.target.files[0].type.split('/')[0] === "image"){
      this.book.img = event.target.files[0];
      
      // loading the book img preview
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        this.imgPreview = reader.result;
      }
    } else {
      event.target.value = null;
      this.toast.warning("selecione um arquivo do tipo imagem.", "Alerta: ");
    }
    
  }

  // bootstrap classes for valid or invalid inputs
  addValidateClass(input: any) :void {
    if (input.className.includes('ng-touched')) {      
      if (input.className.includes('ng-invalid')){
        input.classList.remove('is-valid')
        input.classList.add("is-invalid") 

      }
      
      if (input.className.includes('ng-valid')){
        input.classList.remove('is-invalid')
        input.classList.add("is-valid")
      }
    }
  }

  onSubmit(form: any) {
    console.log(this.book)
    this.api.postBook(this.book)
      .subscribe({
        next: data => {
          console.log(data);
          this.toast.success("Livro adicionado com Sucesso!", "Sucesso: ");
          this.router.navigate(['/']);
          
        },
        error: error => {
          console.log(error);
          this.toast.error("Erro ao adicionar Livro.", "Erro: ");
        }
    })
  }

  

}
