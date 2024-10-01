import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio'
import { Router } from '@angular/router';
import { DatistudenteService } from '../../servizi/datistudente.service';

@Component({
  selector: 'app-homestudente',
  templateUrl: './homestudente.component.html',
  styleUrl: './homestudente.component.css'
})
export class HomestudenteComponent {

  // date1 : Date = new Date()
  // localdate: String = new Date().toLocaleString()

  form: FormGroup = this.fb.group({
    fresh: null,
    nome: ['', [Validators.required, Validators.pattern('^[^0-9±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$')]],
    cognome: ['', [Validators.required, Validators.pattern('^[^0-9±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$')]],
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    // email: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{1,}$')]],
    anno: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]]
  })

  constructor(private fb: FormBuilder, private router: Router, private datistudente: DatistudenteService) {}
  
  get nome() { return this.form.get("nome") }
  get cognome() { return this.form.get("cognome") }
  get email() { return this.form.get("email") }
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

      this.datistudente.fresh = this.isFresh()
      this.datistudente.nome = this.form.get("nome")!.value
      this.datistudente.cognome = this.form.get("cognome")!.value
      this.datistudente.email = this.form.get("email")!.value
      
      this.router.navigate(['/nuovopiano/' + this.getAnno()])
    }
  }
}
