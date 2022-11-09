import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { moveItemInArray} from '@angular/cdk/drag-drop';
import { AddListComponent } from './addList.component';
import { ListComponent } from '../list/list.component'
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
})

/**
 * Ecomerce merchants component
 */
export class BooksComponent implements OnInit {
 
  title:string='Add';
 
  booksList:any;
  constructor( private modalService: NgbModal,public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.booksList=[]
   
  }

  open(){
    let modalRef=this.modalService.open(AddListComponent, { size: 'lg',windowClass:'modal-holder', centered: true });
    modalRef.componentInstance.title ='Add';
    modalRef.componentInstance.passEntry.subscribe((name:any) => {
      this.booksList.push({name:name,books:[]})
    })
  }
  addBook(i:number){
    let modalRef=this.modalService.open(ListComponent, { size: 'lg',windowClass:'modal-holder', centered: true });
    const selectedBooksList= this.booksList[i]['books'];
    modalRef.componentInstance.selectedBooksList =selectedBooksList
    modalRef.componentInstance.passEntry.subscribe((book:any) => {
      this.booksList[i]['books']=[]
      this.booksList[i]['books'].push(...book)
    })
  }
 
  deleteRow(i:number,j:number){
    this.booksList[i]['books'].splice(i,1)
  }
  deleteList(i:any){
    this.booksList.splice(i,1)
  }
 drop(event: any,i:number) {
  moveItemInArray(this.booksList[i]['books'], event.previousIndex, event.currentIndex);
  // Object.keys(this.booksList[i]['books']).forEach(key => {
        //   data.push({id:this.booksList[i]['books'].id,sort:key});
        // });
        
  }
}
