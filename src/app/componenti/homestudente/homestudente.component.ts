import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio'

@Component({
  selector: 'app-homestudente',
  templateUrl: './homestudente.component.html',
  styleUrl: './homestudente.component.css'
})
export class HomestudenteComponent {

  form: FormGroup = this.fb.group({
    fresh: null,
    anno: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]]
  })

  constructor(private fb: FormBuilder) {}
  
  get anno() { return this.form.get("anno") }

  getAnno(){
    return this.form.get("anno")!.value
  }

  isFresh(){ 
    return this.form.get("fresh")?.value 
  }
    
  test(){
    console.log(this.form.get("fresh")?.value)
  }

  submit(form: FormGroupDirective) {
    if (form.valid) {
      console.log(JSON.stringify(this.form.value));
      // include code here to send form data to backend
    }
  }
}
