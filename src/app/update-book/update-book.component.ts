import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/types/Book';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss']
})
export class UpdateBookComponent implements OnInit {
  
  imgPreview: any;

  book: Book = {
    id: undefined,
    title: "",
    category: "",    
    description: "",   
    author: "",
    imgPath: "", 
  }

  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // 
    this.route.params.subscribe(params => {
      const id = params["id"];

      if(!id)  
        this.router.navigate(['']);

      this.api.findBookById(id)
        .subscribe(book => {
          if(book){
            this.book = book;
            this.imgPreview = this.api.baseUrl + book.imgPath;          

          } else {
            this.toast.warning("Livro não encontrado!", "Erro");
            this.router.navigate(['']);
          }
        });
    });
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
        input.classList.remove('is-valid');
        input.classList.add("is-invalid");

      }
      
      if (input.className.includes('ng-valid')){
        input.classList.remove('is-invalid');
        input.classList.add("is-valid");
      }
    }
  }

  onSubmit(form: any) {
    console.log(this.book)
    this.api.updateBook(this.book)
      .subscribe({
        next: data => {
          console.log(data);
          this.toast.success("Livro editado com Sucesso!", "Sucesso: ");
          this.router.navigate(['/']);
          
        },
        error: error => {
          console.log(error);
          this.toast.error("Erro ao editar Livro.", "Erro: ");
        }
    })
  }
}
