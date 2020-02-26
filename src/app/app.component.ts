import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder } from '@angular/forms';
import {NgbNavChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  active = 1;
  myForm: FormGroup;
  tab1Submitted = false;
  tab2Submitted = false;
  submittedEstimation;
  constructor(private formBuilder: FormBuilder, private appService: AppService) { }

  ngOnInit(){
    this.myForm = this.formBuilder.group({
      type: ['', Validators.required],
      pricePerM: ['', [Validators.required, Validators.min(0.1)]],
      area: ['', [Validators.required, Validators.min(6)]],
      roomNumber: ['', [Validators.required, Validators.min(0)]],
      state: ['', [Validators.required]],
    });
  }
  get f() { return this.myForm; }
  get type() { return this.myForm.get('type'); }
  get pricePerM() { return this.myForm.get('pricePerM'); }
  get area() { return this.myForm.get('area'); }
  get roomNumber() { return this.myForm.get('roomNumber'); }
  get state() { return this.myForm.get('state'); }


  onSubmit() {
    this.tab2Submitted = true;
    this.tab1Submitted = true;
    this.appService.getEstimation(this.myForm.value).subscribe(r => {
      this.submittedEstimation = r;
      this.active = 3;
    })
  }

  goNext(){
    if(this.active == 1){
      this.tab1Submitted = true;
      if(this.myForm.valid)this.onSubmit();
      else if(this.type.valid) this.active = 2
    }else if(this.active == 2){
      this.tab2Submitted = true;
      if(this.myForm.valid) this.onSubmit();
    }
  }
  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 3) {
      if(!this.tab2Submitted || !this.submittedEstimation) changeEvent.preventDefault();
    }
  }

  onReset() {
      this.tab1Submitted = false;
      this.tab2Submitted = false;
      this.submittedEstimation = null;
      this.active = 1;
      this.myForm.reset();
  }
}
