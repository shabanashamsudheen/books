import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren,NgZone, AfterViewInit, ContentChild, TemplateRef, EventEmitter, Output, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-list",
  template: `<div class="modal-header">
      <h5 class="modal-title mt-0">{{ title }} List</h5>
      <button
        type="button"
        class="btn-close"
        (click)="activeModal.dismiss('Cross click')"
        aria-hidden="true"
      ></button>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-lg-12">
        
              <form (ngSubmit)="typeSubmit()" [formGroup]="typeValidationForm">
                <div class="form-group mb-2">
                  <label>List Name   *</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter list name"
                    formControlName="list_name"
                    [ngClass]="{
                      'is-invalid': typesubmit && f['list_name'].errors
                    }"
                  />
                  <div
                    *ngIf="typesubmit && f['list_name'].errors"
                    class="invalid-feedback"
                  >
                    <span *ngIf="f['list_name'].errors['required']"
                      >Category Name is required.</span
                    >
                  </div>
                </div>
               
                <div class="form-group mb-0 mt-3">
                  <div>
                    <button type="submit" class="btn btn-primary me-3">
                      Save
                    </button>

                    <button type="reset" class="btn btn-secondary float-end">
                      Reset
                    </button>
                  </div>
                </div>
              </form>
            
        </div>
      </div>
    </div>`,
})

/**
 * Ecomerce merchants component
 */
export class AddListComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input()
  public title!: string;
  typeValidationForm!: FormGroup; // type validation form
  typesubmit: boolean = false;
  id = "";

  constructor(
    public activeModal: NgbActiveModal,private modalService: NgbModal,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    this.typesubmit = false; 
  }
  initForm() {
    this.typeValidationForm = this.formBuilder.group({
      list_name: ["", [Validators.required]],
    });
  }
 

  get f() {
    return this.typeValidationForm.controls;
  }

  typeSubmit() {
    this.typesubmit = true;
    if (this.typeValidationForm.status == "INVALID") return;
    this.passEntry.emit(this.typeValidationForm.value.list_name);
      this.modalService.dismissAll();
       
  }
}
