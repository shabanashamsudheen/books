import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})

/**
 * Ecomerce merchants component
 */
export class ListComponent implements OnInit {
 books=[
    {id:1,title:`Dune`,year:1965,author:`Frank Herbert`},
    {id:2,title:`Ender's Game`,year:1985,author:`Orson Scott Card`},
    {id:3,title:`1984`,year:1949,author:`George Orwell`},
    {id:4,title:`Fahrenheit 451`,year:1953,author:`Ray Bradbury`},
    {id:5,title:`Brave New World`,year:1932,author:`Aldous Huxley`},
  ];
  @Input() selectedBooksList!:any;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  booksselected:any=[]
  constructor( private modalService: NgbModal,public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.booksselected=[...this.selectedBooksList];
  }
  save(){
    this.passEntry.emit(this.booksselected);
    this.modalService.dismissAll()
  }
  isSelected(list:any){
    let index=this.booksselected.findIndex((item:any)=>item.id==list.id)
    return index!=-1
  }
  addItem(list:any){
    console.log(1,this.booksselected)
    let index=this.booksselected.findIndex((item:any)=>item.id==list.id)
    console.log(index)
    if(index!=-1){
      this.booksselected.splice(index,1)
    }else{
      this.booksselected.push(list)
    }
    console.log(this.booksselected)
  }
}
