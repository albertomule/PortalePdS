import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pianiapprovati',
  templateUrl: './pianiapprovati.component.html',
  styleUrl: './pianiapprovati.component.css',
  standalone: false
})
export class PianiapprovatiComponent {
  
  form: FormGroup = this.fb.group({
    matricola: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
  })

  constructor(private fb: FormBuilder, private router: Router) {}
  
  get matricola() { return this.form.get("matricola") }

  getMatricola(){
    return this.form.get("matricola")!.value
  }

  submit(form: FormGroupDirective) {
    if (form.valid) {
      console.log(JSON.stringify(this.form.value));
      // include code here to send form data to backend
      this.router.navigate(['/piano/' + this.getMatricola() + 'a'])
      
    }
  }
}
