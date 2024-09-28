import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio'
import { Router } from '@angular/router';

@Component({
  selector: 'app-homestudente',
  templateUrl: './homestudente.component.html',
  styleUrl: './homestudente.component.css'
})
export class HomestudenteComponent {

  date1 : Date = new Date()
  localdate: String = new Date().toLocaleString()

  form: FormGroup = this.fb.group({
    fresh: null,
    // nome: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{1,}$')]],
    // cognome: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{1,}$')]],
    // email: ['', [Validators.required, Validators.pattern('^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$')]],
    anno: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]]
  })

  constructor(private fb: FormBuilder, private router: Router) {}
  
  // get nome() { return this.form.get("nome") }
  // get cognome() { return this.form.get("cognome") }
  // get email() { return this.form.get("email") }
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
      this.router.navigate(['/nuovopiano/' + this.getAnno()])
    }
  }
}
