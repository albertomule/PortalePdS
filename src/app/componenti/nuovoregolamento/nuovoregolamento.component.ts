import { AfterViewInit, Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import {FormArray, FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators} from '@angular/forms'
import { MongoService } from '../../servizi/mongo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuovoregolamento',
  templateUrl: './nuovoregolamento.component.html',
  styleUrl: './nuovoregolamento.component.css'
})
export class NuovoregolamentoComponent{

  yearStart = 2000
  yearsAfter = 5
  currentYear: number
  years: number[] = []
  selectVal: number = 0

  constructor(private mongo: MongoService, private router: Router){
    this.currentYear = new Date().getFullYear()
    for(let year = this.yearStart; year <= this.currentYear + this.yearsAfter; year++) {
      this.years.push(year);
    }
  }

  exam1Form: FormGroup = new FormGroup({
    exam1List: new FormArray([this.getExamFields()])
  })
  exam2Form: FormGroup = new FormGroup({
    exam2List: new FormArray([this.getExamFields()])
  })
  exam3Form: FormGroup = new FormGroup({
    exam3List: new FormArray([this.getExamFields()])
  })
  exam4Form: FormGroup = new FormGroup({
    exam4List: new FormArray([this.getExamFields()])
  })
  cfuForm: FormGroup = new FormGroup({
    cfumax: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{1,2}$')])
  })

  get cfumax() { return this.cfuForm.get("cfumax") }

  getExamFields(){
    return new FormGroup({
      exam_name: new FormControl(''),
      exam_code: new FormControl(''),
      exam_cfu: new FormControl('')
    })
  }

  examListArray(l: number){
    switch(l){
      case 1: return this.exam1Form.get('exam1List') as FormArray
      case 2: return this.exam2Form.get('exam2List') as FormArray
      case 3: return this.exam3Form.get('exam3List') as FormArray
      default: return this.exam4Form.get('exam4List') as FormArray
    }
  }

  addExam(l: number){
    this.examListArray(l).push(this.getExamFields())
  }

  removeExam(l: number, i: number){
    this.examListArray(l).removeAt(i)
  }

  getFormData(l: number){
    switch(l){
      case 1: console.log(this.exam1Form.value); break;
      case 2: console.log(this.exam2Form.value); break;
      case 3: console.log(this.exam3Form.value); break;
      default: console.log(this.exam4Form.value); break;
    }
  }

  invia(){
    this.mongo.insertRegolamento(this.selectVal.toString(), [this.exam1Form.value, this.exam2Form.value, this.exam3Form.value, this.exam4Form.value]).subscribe((data: any) => {
      console.log(data)
      alert('Il regolamento è stato inserito con successo')
      this.router.navigate(['/regolamenti'])
    })
  }

  inviatest(form: FormGroupDirective){
    if (form.valid) {
      console.log(form.value)
      console.log(this.cfuForm.get("cfumax")!.value)
    }
  }

  // getAllFormData(){
  //   console.log(this.selectVal)
  //   console.log(JSON.stringify(this.exam1Form.value)) 
  //   console.log(this.exam1Form.value)
  //   console.log(this.examListArray(1).at(0).value.exam_name)
  //   console.log(this.examListArray(1).at(1).value.exam_name)
  //   console.log(this.exam1Form.value.exam_code)
  //   console.log(this.exam1Form.value.exam_cfu)
  //   console.log(this.exam2Form.value)
  //   console.log(this.exam3Form.value)
  //   console.log(this.exam4Form.value)
  // }

  // getReg(){
  //   this.mongo.getRegolamento(this.selectVal.toString()).subscribe((data: any) => {
  //     console.log(data)
  //   })
  // }

  // removeReg(){
  //   this.mongo.removeRegolamento(this.selectVal.toString()).subscribe((data: any) => {
  //     console.log(data)
  //   })
  // }
}
